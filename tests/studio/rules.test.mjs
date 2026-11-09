// Daily Web Studio Firestore rules. Runs only against the local emulator, never the live project:
//   firebase emulators:exec --only firestore --project demo-studio "node --test tests/studio/rules.test.mjs"
import { readFile } from "node:fs/promises";
import { test, before, after, beforeEach } from "node:test";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { doc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, collection, serverTimestamp, Timestamp } from "firebase/firestore";

let env;
const OWNER = "owner-uid";
const OTHER = "other-uid";
const ID = "s-test-0001";

const site = (over = {}) => ({
  name: "Malabar Spice Kitchen",
  tagline: "Slow-cooked Malabar flavours",
  location: "Kakkanad, Kochi",
  type: "restaurant",
  look: "warm",
  accent: "amber",
  pages: ["Home", "Menu", "Contact"],
  schema: 1,
  revision: 1,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  ...over,
});

const as = (uid, verified = true) => env.authenticatedContext(uid, { email: `${uid}@example.com`, email_verified: verified }).firestore();
const ref = (db, uid = OWNER, id = ID) => doc(db, "users", uid, "studioProjects", id);

before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-studio",
    firestore: { rules: await readFile(new URL("../../firebase/firestore.rules", import.meta.url), "utf8") },
  });
});
beforeEach(() => env.clearFirestore());
after(() => env.cleanup());

test("verified owner can create, read, update and delete a site", async () => {
  const db = as(OWNER);
  await assertSucceeds(setDoc(ref(db), site()));
  await assertSucceeds(getDoc(ref(db)));
  await assertSucceeds(getDocs(collection(db, "users", OWNER, "studioProjects")));
  await assertSucceeds(updateDoc(ref(db), { name: "Malabar Kitchen", revision: 2, updatedAt: serverTimestamp() }));
  await assertSucceeds(deleteDoc(ref(db)));
});

test("moving a device site keeps an earlier createdAt", async () => {
  await assertSucceeds(setDoc(ref(as(OWNER)), site({ createdAt: Timestamp.fromMillis(Date.now() - 86400000) })));
});

test("unverified email cannot write, but can read and delete own sites", async () => {
  await env.withSecurityRulesDisabled((c) => setDoc(ref(c.firestore()), site({ createdAt: Timestamp.now(), updatedAt: Timestamp.now() })));
  const db = as(OWNER, false);
  await assertFails(setDoc(ref(db, OWNER, "s-test-0002"), site()));
  await assertFails(updateDoc(ref(db), { name: "X", revision: 2, updatedAt: serverTimestamp() }));
  await assertSucceeds(getDoc(ref(db)));
  await assertSucceeds(deleteDoc(ref(db)));
});

test("nobody else can read or write another person's sites", async () => {
  await assertSucceeds(setDoc(ref(as(OWNER)), site()));
  const other = as(OTHER);
  await assertFails(getDoc(ref(other)));
  await assertFails(getDocs(collection(other, "users", OWNER, "studioProjects")));
  await assertFails(updateDoc(ref(other), { name: "Hacked", revision: 2, updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(ref(other)));
  await assertFails(setDoc(ref(other, OWNER, "s-test-0003"), site()));
  await assertFails(getDoc(ref(env.unauthenticatedContext().firestore())));
});

test("bad data is rejected", async () => {
  const db = as(OWNER);
  await assertFails(setDoc(ref(db), site({ name: "" })));
  await assertFails(setDoc(ref(db), site({ name: "x".repeat(61) })));
  await assertFails(setDoc(ref(db), site({ type: "casino" })));
  await assertFails(setDoc(ref(db), site({ pages: [] })));
  await assertFails(setDoc(ref(db), site({ pages: Array(13).fill("Page") })));
  await assertFails(setDoc(ref(db), site({ revision: 5 })));
  await assertFails(setDoc(ref(db), site({ admin: true })));
  await assertFails(setDoc(ref(db), site({ createdAt: Timestamp.fromMillis(Date.now() + 86400000) })));
  await assertFails(setDoc(ref(db, OWNER, "BAD ID!"), site()));
});

test("updates must bump the revision by one and keep createdAt", async () => {
  const db = as(OWNER);
  await assertSucceeds(setDoc(ref(db), site()));
  await assertFails(updateDoc(ref(db), { name: "Same rev", revision: 1, updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref(db), { name: "Skip", revision: 3, updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref(db), { revision: 2, createdAt: Timestamp.fromMillis(0), updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(ref(db), { name: "Stale time", revision: 2, updatedAt: Timestamp.fromMillis(0) }));
});
