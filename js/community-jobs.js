/* Merge approved community posts (employer portal + quick requests) into the main JOBS board.
   Loads after /data/jobs-data.js and before jobs.js / job.js. Posts get ids "c-<firestoreId>". */
(function () {
  "use strict";
  if (typeof JOBS === "undefined" || !window.IPDFirestore) return;

  function iso(ts) {
    const d = ts ? new Date(ts) : null;
    return d && !isNaN(d) ? d.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  }
  function expLevel(text) {
    const t = String(text || "").toLowerCase();
    if (/fresher|entry|no experience|0\s*[-–to]+\s*[0-3]|^0\b/.test(t)) return /\b[2-9]\s*\+?\s*(year|yr)/.test(t) ? "both" : "fresher";
    if (/\d/.test(t)) return "experienced";
    return "both";
  }
  function toJob(p) {
    const walk = p.postType === "walkin";
    const w = p.walkIn || {};
    const apply =
      p.applyMethod === "link" && p.applyLink
        ? p.applyLink
        : p.applyMethod === "email" && p.applyEmail
          ? "mailto:" + p.applyEmail
          : p.applyMethod === "portal" || !p.applyMethod
            ? "/infoparkdaily/jobs/?id=" + encodeURIComponent(p.id)
            : p.applyLink || (p.applyEmail ? "mailto:" + p.applyEmail : "");
    const how = walk
      ? `Walk in on ${w.date || "the date shown"}${w.time ? ", " + w.time : ""} at ${w.venue || "the venue shown"}.${w.documents ? " Bring: " + w.documents + "." : ""}`
      : p.applyMethod === "email"
        ? `Email your resume to ${p.applyEmail}.`
        : p.applyMethod === "link"
          ? "Apply on the employer’s official page."
          : "Apply on InfoparkDaily — sign in and send your profile to the employer.";
    const tags = [walk ? "Walk-in" : "", p.postType === "alert" ? "Job alert" : "", p.workMode || "", p.employmentType || "", p.sector || "", "Verified by InfoparkDaily"].filter(Boolean);
    return {
      id: "c-" + p.id,
      community: true,
      company: p.company || "Company",
      logo: "",
      companyBlurb: `${p.company} · ${p.title} · ${p.location}`,
      location: p.location || p.park || "Kerala",
      roles: [p.title || "Open role"],
      experience: expLevel(p.experience),
      experienceRange: p.experience || "",
      employmentType: p.employmentType || "",
      workMode: p.workMode || "",
      applyLink: apply,
      email: p.applyEmail || "",
      website: p.website || "",
      applyDeadline: p.closingDate && /^\d{4}-\d{2}-\d{2}$/.test(p.closingDate) ? p.closingDate : walk && w.date ? w.date : "Rolling",
      postedDate: iso(p.createdAt),
      source: p.kind === "request" ? "InfoparkDaily Recruit" : "InfoparkDaily employer",
      verified: true,
      verificationNote:
        "Reviewed by the InfoparkDaily team before publishing. Always confirm details with the employer. InfoparkDaily never collects money for jobs — never pay anyone for an application or interview.",
      tags,
      industry: p.sector || "",
      isWalkIn: walk,
      walkInDate: walk ? w.date || "" : "",
      walkinTime: walk ? w.time || "" : "",
      walkinLocation: walk ? w.venue || "" : "",
      address: walk ? w.venue || "" : "",
      workDetails: p.description || "",
      description: p.description || "",
      requirements: p.requirements || [],
      skills: p.skills || [],
      salaryRange: p.payText || (p.pay ? "₹" + Number(p.pay).toLocaleString("en-IN") + " / " + (p.basis || "month") : ""),
      vacancies: p.vacancies || "",
      howToApply: how,
      urgentHiring: !!p.urgent
    };
  }

  window.IPD_COMMUNITY_PROMISE = window.IPDFirestore.approvedJobs()
    .then((posts) => {
      const known = new Set(JOBS.map((j) => String(j.id)));
      const fresh = posts
        .filter((p) => p.title && p.company)
        .map(toJob)
        .filter((j) => !known.has(j.id));
      if (!fresh.length) return 0;
      JOBS.unshift(...fresh);
      window.dispatchEvent(new CustomEvent("ipd:jobs-added", { detail: { count: fresh.length } }));
      return fresh.length;
    })
    .catch((err) => {
      console.warn("Community jobs unavailable:", err && err.message);
      return 0;
    });
})();
