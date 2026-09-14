// Run against the isolated Firebase emulator, never against the live project.
import { readFile } from "node:fs/promises";
import { test, after, before } from "node:test";
import assert from "node:assert/strict";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  serverTimestamp,
  writeBatch,
  Bytes,
} from "firebase/firestore";
let env, worker, employer, other, admin, guest, unverified;
const now = () => serverTimestamp();
const member = (role, email) => ({
  name: role === "employer" ? "Test Employer" : "Test Worker",
  email,
  phone: "",
  company: role === "employer" ? "Test Company" : "",
  role,
  createdAt: now(),
  updatedAt: now(),
  lastReadAt: now(),
});
const profile = () => ({
  uid: "worker",
  name: "Test Worker",
  title: "Software developer",
  sector: "Technology",
  location: "Kochi",
  skills: ["JavaScript"],
  about: "Experience building useful software.",
  experience: "3 years",
  rate: 1000,
  basis: "day",
  available: true,
  availableFrom: "",
  photo: "",
  status: "pending",
  createdAt: now(),
  updatedAt: now(),
});
const job = () => ({
  ownerUid: "employer",
  kind: "community",
  title: "Software developer",
  company: "Test Company",
  sector: "Technology",
  location: "Kochi",
  description: "Build and maintain useful software for our customers.",
  requirements: ["JavaScript"],
  skills: ["JavaScript"],
  experience: "2 years",
  pay: 50000,
  basis: "month",
  employmentType: "Full-time",
  workMode: "Hybrid",
  vacancies: 1,
  urgent: false,
  closingDate: "2027-01-30",
  status: "pending",
  createdAt: now(),
  updatedAt: now(),
});
const application = () => ({
  jobId: "job1",
  jobTitle: "Software developer",
  company: "Test Company",
  employerUid: "employer",
  workerUid: "worker",
  workerName: "Test Worker",
  status: "submitted",
  coverLetter: "I have relevant experience.",
  initiatedBy: "worker",
  createdAt: now(),
  updatedAt: now(),
});
const file = () => ({
  name: "resume.pdf",
  type: "application/pdf",
  size: 4,
  data: Bytes.fromUint8Array(new Uint8Array([1, 2, 3, 4])),
  updatedAt: now(),
});
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-infoparkdaily",
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: await readFile("firebase/firestore.rules", "utf8"),
    },
  });
  await env.clearFirestore();
  const ctx = (uid, email = uid + "@example.test", verified = true) =>
    env
      .authenticatedContext(uid, { email, email_verified: verified })
      .firestore();
  worker = ctx("worker");
  employer = ctx("employer");
  other = ctx("other");
  admin = ctx("admin");
  unverified = ctx("unverified", "unverified@example.test", false);
  guest = env.unauthenticatedContext().firestore();
  await env.withSecurityRulesDisabled(async (c) =>
    setDoc(doc(c.firestore(), "marketAdmins/admin@example.test"), {
      active: true,
    }),
  );
});
after(async () => env?.cleanup());
test("private accounts require verified ownership and admin rights cannot be forged", async () => {
  await assertFails(
    setDoc(
      doc(unverified, "marketMembers/unverified"),
      member("worker", "unverified@example.test"),
    ),
  );
  await assertSucceeds(
    setDoc(
      doc(worker, "marketMembers/worker"),
      member("worker", "worker@example.test"),
    ),
  );
  await assertSucceeds(
    setDoc(
      doc(employer, "marketMembers/employer"),
      member("employer", "employer@example.test"),
    ),
  );
  await assertFails(getDoc(doc(other, "marketMembers/worker")));
  await assertFails(getDoc(doc(guest, "marketMembers/worker")));
  await assertFails(
    setDoc(doc(worker, "marketAdmins/worker@example.test"), { active: true }),
  );
  await assertSucceeds(getDoc(doc(worker, "marketAdmins/worker@example.test")));
  await assertSucceeds(getDoc(doc(admin, "marketMembers/worker")));
});
test("profiles and jobs need review, and owners cannot self-approve", async () => {
  await assertSucceeds(setDoc(doc(worker, "marketProfiles/worker"), profile()));
  await assertFails(getDoc(doc(guest, "marketProfiles/worker")));
  await assertFails(
    updateDoc(doc(worker, "marketProfiles/worker"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(setDoc(doc(employer, "marketJobs/job1"), job()));
  await assertFails(getDoc(doc(guest, "marketJobs/job1")));
  await assertFails(
    updateDoc(doc(employer, "marketJobs/job1"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    updateDoc(doc(admin, "marketProfiles/worker"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    updateDoc(doc(admin, "marketJobs/job1"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    getDocs(
      query(collection(guest, "marketJobs"), where("status", "==", "approved")),
    ),
  );
  await assertSucceeds(
    getDocs(
      query(
        collection(guest, "marketProfiles"),
        where("status", "==", "approved"),
      ),
    ),
  );
  await assertFails(getDocs(collection(guest, "marketJobs")));
});
test("private documents are bounded and application attachments share atomically with participants", async () => {
  await assertSucceeds(
    setDoc(doc(worker, "marketMembers/worker/documents/resume"), file()),
  );
  await assertFails(
    getDoc(doc(employer, "marketMembers/worker/documents/resume")),
  );
  await assertFails(
    setDoc(doc(worker, "marketMembers/worker/documents/unknown"), file()),
  );
  await assertFails(
    setDoc(doc(worker, "marketMembers/worker/documents/other"), {
      ...file(),
      size: 700001,
    }),
  );
  const batch = writeBatch(worker);
  batch.set(doc(worker, "marketApplications/job1_worker"), application());
  batch.set(
    doc(worker, "marketApplications/job1_worker/documents/resume"),
    file(),
  );
  await assertSucceeds(batch.commit());
  await assertSucceeds(
    getDoc(doc(employer, "marketApplications/job1_worker/documents/resume")),
  );
  await assertFails(
    getDoc(doc(other, "marketApplications/job1_worker/documents/resume")),
  );
  await assertFails(
    setDoc(doc(other, "marketApplications/job1_other"), application()),
  );
  await assertSucceeds(
    getDocs(
      query(
        collection(employer, "marketApplications"),
        where("employerUid", "==", "employer"),
      ),
    ),
  );
  await assertFails(getDocs(collection(employer, "marketApplications")));
});
test("hire transitions are enforced, chat opens only after admin approval, and reviews need completion", async () => {
  const msg = () => ({ senderUid: "worker", text: "Hello", createdAt: now() });
  await assertFails(
    setDoc(doc(worker, "marketApplications/job1_worker/messages/early"), msg()),
  );
  await assertFails(
    updateDoc(doc(worker, "marketApplications/job1_worker"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    updateDoc(doc(employer, "marketApplications/job1_worker"), {
      status: "hire_requested",
      updatedAt: now(),
    }),
  );
  await assertFails(
    updateDoc(doc(employer, "marketApplications/job1_worker"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    updateDoc(doc(admin, "marketApplications/job1_worker"), {
      status: "approved",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    setDoc(doc(worker, "marketApplications/job1_worker/messages/first"), msg()),
  );
  await assertFails(
    setDoc(
      doc(employer, "marketApplications/job1_worker/messages/spoof"),
      msg(),
    ),
  );
  await assertFails(
    getDoc(doc(other, "marketApplications/job1_worker/messages/first")),
  );
  const review = () => ({
    applicationId: "job1_worker",
    authorUid: "worker",
    authorName: "Test Worker",
    recipientUid: "employer",
    rating: 5,
    text: "Good experience.",
    createdAt: now(),
  });
  await assertFails(
    setDoc(doc(worker, "marketReviews/job1_worker_worker"), review()),
  );
  await assertSucceeds(
    updateDoc(doc(employer, "marketApplications/job1_worker"), {
      status: "completed",
      updatedAt: now(),
    }),
  );
  await assertSucceeds(
    setDoc(doc(worker, "marketReviews/job1_worker_worker"), review()),
  );
  await assertFails(
    setDoc(doc(worker, "marketReviews/job1_worker_worker"), review()),
  );
  await assertFails(
    setDoc(doc(other, "marketReviews/job1_worker_other"), {
      ...review(),
      authorUid: "other",
    }),
  );
  await assertSucceeds(getDoc(doc(guest, "marketReviews/job1_worker_worker")));
});
test("editing a profile returns it to review; existing career resumes stay private", async () => {
  await assertSucceeds(
    updateDoc(doc(worker, "marketProfiles/worker"), {
      title: "Senior developer",
      status: "pending",
      updatedAt: now(),
    }),
  );
  await assertFails(getDoc(doc(guest, "marketProfiles/worker")));
  await assertFails(getDoc(doc(other, "users/worker/resumes/private")));
  await assertFails(getDoc(doc(admin, "users/worker/resumes/private")));
});
