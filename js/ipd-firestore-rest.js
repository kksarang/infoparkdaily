/* Tiny Firestore REST client for public pages (no SDK needed).
   Security is enforced by firebase/firestore.rules — this file only formats requests. */
(function () {
  "use strict";
  /* Local testing: same switch as the InfoparkDaily hub (sessionStorage "ipd_market_emulator" on localhost). */
  let emulator = false;
  try {
    emulator = ["localhost", "127.0.0.1"].includes(location.hostname) && sessionStorage.getItem("ipd_market_emulator") === "1";
  } catch (_e) {}
  const PROJECT = emulator ? "demo-infoparkdaily" : "infoparkdailyweb";
  const KEY = emulator ? "demo-key" : "AIzaSyA_Oi_2ciCduRiRjMXjI6bbXYjymeGlr5M";
  const HOST = emulator ? "http://127.0.0.1:8080" : "https://firestore.googleapis.com";
  const BASE = `${HOST}/v1/projects/${PROJECT}/databases/(default)/documents`;
  const DOC_PREFIX = `projects/${PROJECT}/databases/(default)/documents`;

  function encode(v) {
    if (v === null || v === undefined) return { nullValue: null };
    if (typeof v === "boolean") return { booleanValue: v };
    if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    if (Array.isArray(v)) return { arrayValue: { values: v.map(encode) } };
    if (typeof v === "object") return { mapValue: { fields: encodeFields(v) } };
    return { stringValue: String(v) };
  }
  function encodeFields(obj) {
    const out = {};
    Object.keys(obj).forEach((k) => {
      if (obj[k] !== undefined) out[k] = encode(obj[k]);
    });
    return out;
  }
  function decode(v) {
    if (!v) return null;
    if ("stringValue" in v) return v.stringValue;
    if ("integerValue" in v) return Number(v.integerValue);
    if ("doubleValue" in v) return v.doubleValue;
    if ("booleanValue" in v) return v.booleanValue;
    if ("timestampValue" in v) return v.timestampValue;
    if ("nullValue" in v) return null;
    if ("arrayValue" in v) return (v.arrayValue.values || []).map(decode);
    if ("mapValue" in v) return decodeFields(v.mapValue.fields || {});
    return null;
  }
  function decodeFields(fields) {
    const out = {};
    Object.keys(fields || {}).forEach((k) => (out[k] = decode(fields[k])));
    return out;
  }
  function docOut(d) {
    return { id: d.name.split("/").pop(), ...decodeFields(d.fields) };
  }

  /** Random, unguessable ID (used as the public tracking ID). */
  function secureId(prefix) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(14);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    let s = "";
    bytes.forEach((b) => (s += alphabet[b % alphabet.length]));
    return `${prefix}-${s.slice(0, 4)}-${s.slice(4, 9)}-${s.slice(9, 14)}`;
  }

  /** Create a document with server-set createdAt/updatedAt; fails if the ID already exists. */
  async function create(collection, id, data) {
    const res = await fetch(`${BASE}:commit?key=${KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        writes: [
          {
            update: { name: `${DOC_PREFIX}/${collection}/${encodeURIComponent(id)}`, fields: encodeFields(data) },
            currentDocument: { exists: false },
            updateTransforms: [
              { fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" },
              { fieldPath: "updatedAt", setToServerValue: "REQUEST_TIME" }
            ]
          }
        ]
      })
    });
    if (!res.ok) {
      let msg = "Request failed (" + res.status + ")";
      try {
        const j = await res.json();
        if (j.error && j.error.message) msg = j.error.message;
      } catch (_e) {}
      throw new Error(msg);
    }
    return id;
  }

  async function get(collection, id) {
    const res = await fetch(`${BASE}/${collection}/${encodeURIComponent(id)}?key=${KEY}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Could not load (" + res.status + ")");
    return docOut(await res.json());
  }

  /** Approved public job posts (both employer-portal and quick-request posts). */
  async function approvedJobs(max = 300) {
    const res = await fetch(`${BASE}:runQuery?key=${KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "marketJobs" }],
          where: { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "approved" } } },
          limit: max
        }
      })
    });
    if (!res.ok) throw new Error("Could not load community jobs (" + res.status + ")");
    const rows = await res.json();
    return rows.filter((r) => r.document).map((r) => docOut(r.document));
  }

  window.IPDFirestore = { create, get, approvedJobs, secureId };
})();
