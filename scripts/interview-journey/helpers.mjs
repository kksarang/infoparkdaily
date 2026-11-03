/* Small HTML helpers shared by the Interview Journey chapter files. */

export const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const ext = (href, label) =>
  `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const ul = (items, cls = "") =>
  `<ul${cls ? ` class="${cls}"` : ""}>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

export const ol = (items, cls = "ij-steps") =>
  `<ol class="${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;

export const tip = (html, label = "Tip") =>
  `<div class="ij-note ij-note--tip"><strong>${label}</strong><p>${html}</p></div>`;

export const warn = (html, label = "Watch out") =>
  `<div class="ij-note ij-note--warn"><strong>${label}</strong><p>${html}</p></div>`;

export const fact = (html, label = "Reality check") =>
  `<div class="ij-note ij-note--fact"><strong>${label}</strong><p>${html}</p></div>`;

/** Content only for one experience track. kind: "fresher" | "experienced" */
export const track = (kind, html) =>
  `<div class="ij-track" data-track="${kind}"><p class="ij-track-tag">${
    kind === "fresher" ? "Fresher track" : "Experienced track"
  }</p>${html}</div>`;

export const both = (fresherHtml, experiencedHtml) =>
  `<div class="ij-tracks">${track("fresher", fresherHtml)}${track("experienced", experiencedHtml)}</div>`;

export const h3 = (t) => `<h3>${t}</h3>`;

export const example = (title, html) =>
  `<figure class="ij-example"><figcaption>${title}</figcaption><div>${html}</div></figure>`;

export const table = (head, rows, caption = "") =>
  `<div class="ij-table-wrap" tabindex="0" role="region" aria-label="${esc(caption || head.join(", "))}"><table class="ij-table">${
    caption ? `<caption>${caption}</caption>` : ""
  }<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map(
      (r) =>
        `<tr>${r
          .map((c, i) =>
            i === 0
              ? `<th scope="row">${c}</th>`
              : `<td data-label="${esc(String(head[i]).replace(/<[^>]+>/g, ""))}">${c}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("")}</tbody></table></div>`;

/** Question + model answer list. */
export const qa = (pairs) =>
  `<div class="ij-qa">${pairs
    .map(
      ([q, a, why]) =>
        `<details class="ij-qa-item"><summary>${q}</summary><div class="ij-qa-body"><p class="ij-qa-label">Sample answer</p><p>${a}</p>${
          why
            ? `<p class="ij-qa-why"><strong>Why it works:</strong> ${why}</p>`
            : ""
        }</div></details>`,
    )
    .join("")}</div>`;

let copyId = 0;
/** Copyable block (email template, script, message). */
export const copy = (title, text, meta = "") => {
  copyId += 1;
  const id = `ij-copy-${copyId}`;
  return `<div class="ij-copy"><div class="ij-copy-head"><div><p class="ij-copy-title">${title}</p>${
    meta ? `<p class="ij-copy-meta">${meta}</p>` : ""
  }</div><button type="button" class="ij-copy-btn" data-copy="${id}">Copy</button></div><pre id="${id}">${esc(
    text.trim(),
  )}</pre></div>`;
};

/** Grid of small cards: [title, html] */
export const cards = (items, cls = "") =>
  `<div class="ij-cards ${cls}">${items
    .map(
      ([t, html, badge]) =>
        `<div class="ij-card">${badge ? `<span class="ij-badge">${badge}</span>` : ""}<h4>${t}</h4>${html}</div>`,
    )
    .join("")}</div>`;

/** Horizontal numbered mini-flow: ["Step", ...] */
export const flow = (items, label) =>
  `<ol class="ij-miniflow" aria-label="${esc(label)}">${items.map((i) => `<li><span>${i}</span></li>`).join("")}</ol>`;

/** Career tool call-to-action */
export const toolCta = (title, text, href, label, secondary) =>
  `<div class="ij-tool"><div><p class="ij-tool-kicker">InfoparkDaily career tool</p><h4>${title}</h4><p>${text}</p></div><div class="ij-tool-actions"><a class="ij-btn" href="${href}">${label}</a>${
    secondary
      ? `<a class="ij-btn ij-btn--ghost" href="${secondary[0]}">${secondary[1]}</a>`
      : ""
  }</div></div>`;
