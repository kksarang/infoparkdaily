/* Job detail pages: load the one detail shard this job lives in, merge the full record into JOBS, then start job.js.
 *
 * /data/jobs-index.js only carries the slim list fields (open jobs). The full text of every job
 * (requirements, responsibilities, notes…) is split across /data/job-details/<n>.json by
 * scripts/build-jobs-index.mjs, so a job page downloads a few hundred KB instead of the whole board.
 *
 * Usage (404.html): <script src="/js/job-detail-loader.js" data-next="/js/job.js?v=…" defer></script>
 */
(function () {
  var self = document.currentScript;
  var next = (self && self.getAttribute("data-next")) || "/js/job.js";

  function startJobPage() {
    var tag = document.createElement("script");
    tag.src = next;
    document.body.appendChild(tag);
  }

  /* Must match shardOf() in scripts/build-jobs-index.mjs (FNV-1a, 32-bit). */
  function shardOf(id, shards) {
    var h = 0x811c9dc5;
    var s = String(id || "").trim().toLowerCase();
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h % shards;
  }

  function jobIdFromUrl() {
    var fromQuery = "";
    try {
      fromQuery = (new URLSearchParams(window.location.search).get("id") || "").trim();
    } catch (_e) {}
    if (fromQuery) return fromQuery.toLowerCase();
    var match = String(window.location.pathname || "").match(/\/job\/([^\/]+)\/?$/i);
    if (!match) return "";
    try {
      return decodeURIComponent(match[1]).trim().toLowerCase();
    } catch (_e) {
      return match[1].trim().toLowerCase();
    }
  }

  var shards = Number(window.IPD_JOBS_SHARDS) || 0;
  var id = jobIdFromUrl();
  if (window.__IPD_IS_COMPANY_ROUTE__ === true || typeof JOBS === "undefined" || !shards || !id || /^c-/.test(id)) {
    startJobPage();
    return;
  }

  var url = "/data/job-details/" + shardOf(id, shards) + ".json?v=" + encodeURIComponent(window.IPD_JOBS_VERSION || "");
  fetch(url, { credentials: "same-origin" })
    .then(function (res) {
      return res.ok ? res.json() : {};
    })
    .then(function (byId) {
      var full = byId && byId[id];
      if (!full) return;
      for (var i = 0; i < JOBS.length; i++) {
        if (String(JOBS[i].id || "").toLowerCase() === id) {
          Object.assign(JOBS[i], full);
          return;
        }
      }
      JOBS.push(full); // expired jobs are not in the open-jobs index
    })
    .catch(function () {
      /* fall back to the list record */
    })
    .then(startJobPage);
})();
