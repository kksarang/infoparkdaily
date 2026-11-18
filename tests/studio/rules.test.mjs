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

test("a site can record its template and edited flag, with valid values only", async () => {
  const db = as(OWNER);
  await assertSucceeds(setDoc(ref(db), site({ template: "developer-pro", edited: false })));
  await assertSucceeds(updateDoc(ref(db), { edited: true, revision: 2, updatedAt: serverTimestamp() }));
  await assertSucceeds(setDoc(ref(db, OWNER, "s-test-0004"), site({ template: "" })));
  await assertFails(setDoc(ref(db, OWNER, "s-test-0005"), site({ template: "../../evil" })));
  await assertFails(setDoc(ref(db, OWNER, "s-test-0006"), site({ edited: "yes" })));
});

const content = (db, uid = OWNER, id = ID, page = "home") => doc(db, "users", uid, "studioProjects", id, "content", page);
const page = (over = {}) => ({ html: "<h1>Hello</h1>", css: "h1{color:red}", schema: 1, updatedAt: serverTimestamp(), ...over });

test("owner can save, read and delete the edited page", async () => {
  const db = as(OWNER);
  await assertSucceeds(setDoc(ref(db), site()));
  await assertSucceeds(setDoc(content(db), page()));
  await assertSucceeds(getDoc(content(db)));
  await assertSucceeds(setDoc(content(db), page({ html: "<h1>Changed</h1>" })));
  await assertSucceeds(deleteDoc(content(db)));
});

test("edited page: only 'home', owner, verified, known fields and size limits", async () => {
  const db = as(OWNER);
  await assertFails(setDoc(content(db, OWNER, ID, "about"), page()));
  await assertFails(setDoc(content(db), page({ script: "x" })));
  await assertFails(setDoc(content(db), page({ html: "x".repeat(400001) })));
  await assertFails(setDoc(content(db), page({ css: "x".repeat(300001) })));
  await assertFails(setDoc(content(db), page({ updatedAt: Timestamp.fromMillis(0) })));
  await assertFails(setDoc(content(as(OWNER, false)), page()));
  await assertSucceeds(setDoc(content(db), page()));
  const other = as(OTHER);
  await assertFails(getDoc(content(other)));
  await assertFails(setDoc(content(other), page()));
  await assertFails(deleteDoc(content(other)));
});
