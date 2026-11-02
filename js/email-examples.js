(function () {
  var workspace = document.getElementById("em-workspace");
  var picker = document.getElementById("em-picker");
  var list = document.getElementById("em-list");
  var search = document.getElementById("em-search");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".em-chip"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".em-card"));
  var countEl = document.getElementById("em-count");
  var emptyEl = document.getElementById("em-empty");
  var form = document.getElementById("em-fill");
  var STORE = "ipd-email-details";
  var FIELD_OF = {
    "[your name]": "name",
    "[name]": "name",
    "[job title]": "role",
    "[role / team]": "role",
    "[company]": "company",
    "[city]": "city",
    "[phone]": "phone",
    "[email]": "email",
  };
  var values = {};
  var filter = "all";
  var selected = null;

  function slug(text) {
    return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function keyOf(token) {
    var lower = token.toLowerCase();
    return FIELD_OF[lower] || lower;
  }

  function save() {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(values));
    } catch (_e) {
      /* details just will not survive a reload */
    }
  }

  function renderPre(pre) {
    var original = pre.getAttribute("data-original") || "";
    pre.innerHTML = escapeHtml(original).replace(/\[[^\]]+\]/g, function (token) {
      return '<span class="em-blank" data-token="' + token + '" data-key="' + escapeHtml(keyOf(token)) + '">' + token + "</span>";
    });
    pre.setAttribute("contenteditable", "plaintext-only");
    if (pre.contentEditable !== "plaintext-only") pre.setAttribute("contenteditable", "true");
    pre.setAttribute("spellcheck", "true");
  }

  function paintBlank(span, active) {
    var value = values[span.getAttribute("data-key")];
    if (span !== active) span.textContent = value || span.getAttribute("data-token");
    span.classList.toggle("is-filled", !!value);
  }

  function syncBlanks(active) {
    document.querySelectorAll(".em-blank").forEach(function (span) {
      paintBlank(span, active);
    });
    if (form) {
      Object.keys(form.elements).forEach(function (index) {
        var input = form.elements[index];
        if (input && input.name && input !== document.activeElement && values[input.name] !== undefined) {
          input.value = values[input.name];
        }
      });
    }
    items.forEach(updateStatus);
    save();
  }

  function updateStatus(item) {
    var blanks = item.card.querySelectorAll(".em-blank:not(.is-filled)").length;
    var label = item.card.querySelector(".em-blanks");
    label.textContent = blanks ? blanks + (blanks === 1 ? " blank" : " blanks") + " left" : "Ready to send";
    label.classList.toggle("is-done", !blanks);
  }

  function blankAtCaret() {
    var selection = window.getSelection();
    var node = selection && selection.anchorNode;
    if (!node) return null;
    var el = node.nodeType === 1 ? node : node.parentElement;
    return el && el.closest ? el.closest(".em-blank") : null;
  }

  function selectAll(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  var items = cards.map(function (card) {
    var title = card.querySelector("h3").textContent;
    var tag = card.querySelector(".em-tag");
    var blocks = card.querySelectorAll(".em-block");
    card.querySelectorAll(".em-pre").forEach(function (pre) {
      pre.setAttribute("data-original", pre.textContent || "");
      renderPre(pre);
    });
    var subjectPre = blocks[0].querySelector(".em-pre");
    subjectPre.setAttribute("aria-label", "Email subject");
    blocks[1].querySelector(".em-pre").setAttribute("aria-label", "Email body");
    var tip = card.querySelector(".em-tip");

    var compose = document.createElement("div");
    compose.className = "em-compose";
    compose.innerHTML =
      '<div class="em-compose-bar"><span class="em-compose-title">New message</span><p class="em-blanks" aria-live="polite"></p></div>' +
      '<label class="em-to"><span>To</span><input class="em-to-input" type="email" placeholder="Email from the official posting" autocomplete="off" /></label>';
    blocks[0].insertAdjacentElement("beforebegin", compose);
    compose.appendChild(blocks[0]);
    compose.appendChild(blocks[1]);
    var actions = document.createElement("div");
    actions.className = "em-mail-actions";
    actions.innerHTML =
      '<button type="button" class="em-btn em-open-gmail">Open in Gmail</button>' +
      '<button type="button" class="em-btn em-btn-ghost em-copy-all">Copy email</button>' +
      '<button type="button" class="em-btn em-btn-ghost em-open-mailto">Mail app</button>' +
      '<button type="button" class="em-reset">Reset</button>';
    compose.appendChild(actions);
    if (tip) compose.insertAdjacentElement("afterend", tip);

    var li = document.createElement("li");
    var button = document.createElement("button");
    button.type = "button";
    button.className = "em-list-item";
    button.innerHTML =
      '<span class="em-list-title">' + escapeHtml(title) + "</span>" +
      '<span class="em-list-tag">' + escapeHtml(tag ? tag.textContent : "") + "</span>";
    li.appendChild(button);
    list.appendChild(li);

    var item = {
      id: slug(title),
      card: card,
      li: li,
      button: button,
      tags: (card.getAttribute("data-tags") || "").split(","),
      words: card.textContent.toLowerCase(),
    };
    button.addEventListener("click", function () {
      select(item, true);
    });
    return item;
  });

  function select(item, userPicked) {
    selected = item;
    items.forEach(function (other) {
      other.card.hidden = other !== item;
      if (other === item) other.button.setAttribute("aria-current", "true");
      else other.button.removeAttribute("aria-current");
    });
    if (userPicked) {
      try {
        history.replaceState(null, "", "#" + item.id);
      } catch (_e) {
        /* the link just will not update */
      }
      if (window.matchMedia("(max-width: 899px)").matches) {
        item.card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function paint() {
    var query = search.value.trim().toLowerCase();
    var shown = items.filter(function (item) {
      var on =
        (filter === "all" || item.tags.indexOf(filter) !== -1) &&
        (!query || item.words.indexOf(query) !== -1);
      item.li.hidden = !on;
      return on;
    });
    countEl.textContent = shown.length + (shown.length === 1 ? " email" : " emails");
    emptyEl.hidden = shown.length > 0;
    if (!shown.length) {
      items.forEach(function (item) {
        item.card.hidden = true;
      });
      selected = null;
    } else if (shown.indexOf(selected) === -1) {
      select(shown[0], false);
    } else {
      selected.card.hidden = false;
    }
  }

  function flash(btn, text) {
    var old = btn.textContent;
    var done = function () {
      btn.textContent = "Copied";
      btn.classList.add("is-copied");
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove("is-copied");
      }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        window.prompt("Copy this text:", text);
      });
    } else {
      window.prompt("Copy this text:", text);
    }
  }

  function cardParts(card) {
    var pres = card.querySelectorAll(".em-block .em-pre");
    return {
      to: card.querySelector(".em-to-input").value.trim(),
      subject: pres[0].innerText.replace(/\s*\n\s*/g, " ").trim(),
      body: pres[1].innerText.trim(),
    };
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      filter = chip.getAttribute("data-filter") || "all";
      paint();
    });
  });
  search.addEventListener("input", paint);

  document.addEventListener("input", function (ev) {
    if (ev.target.classList && ev.target.classList.contains("em-pre")) {
      var span = blankAtCaret();
      if (!span) return;
      var text = span.textContent.trim();
      values[span.getAttribute("data-key")] = text === span.getAttribute("data-token") ? "" : text;
      syncBlanks(span);
    }
  });

  document.addEventListener("focusout", function (ev) {
    if (ev.target.classList && ev.target.classList.contains("em-pre")) syncBlanks(null);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Enter" || !ev.target.classList || !ev.target.classList.contains("em-pre")) return;
    var isSubject = ev.target === ev.target.closest(".em-compose").querySelector(".em-pre");
    if (isSubject) {
      ev.preventDefault();
      ev.target.blur();
    } else if (ev.target.contentEditable !== "plaintext-only") {
      ev.preventDefault();
      document.execCommand("insertLineBreak");
    }
  });

  document.addEventListener("click", function (ev) {
    var blank = ev.target.closest(".em-blank");
    if (blank && !blank.classList.contains("is-filled")) {
      selectAll(blank);
      return;
    }
    var copy = ev.target.closest(".em-copy");
    if (copy) {
      flash(copy, copy.closest(".em-block").querySelector(".em-pre").innerText.trim());
      return;
    }
    var card = ev.target.closest(".em-card");
    if (!card) return;
    if (ev.target.closest(".em-reset")) {
      card.querySelectorAll(".em-pre").forEach(renderPre);
      card.querySelector(".em-to-input").value = "";
      syncBlanks(null);
      return;
    }
    if (!ev.target.closest(".em-mail-actions")) return;
    var parts = cardParts(card);
    if (ev.target.closest(".em-copy-all")) {
      flash(ev.target.closest(".em-copy-all"), "Subject: " + parts.subject + "\n\n" + parts.body);
    } else if (ev.target.closest(".em-open-gmail")) {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=" +
          encodeURIComponent(parts.to) +
          "&su=" +
          encodeURIComponent(parts.subject) +
          "&body=" +
          encodeURIComponent(parts.body),
        "_blank",
        "noopener"
      );
    } else if (ev.target.closest(".em-open-mailto")) {
      location.href =
        "mailto:" + encodeURIComponent(parts.to).replace(/%40/g, "@") +
        "?subject=" + encodeURIComponent(parts.subject) +
        "&body=" + encodeURIComponent(parts.body);
    }
  });

  try {
    values = JSON.parse(sessionStorage.getItem(STORE) || "{}") || {};
  } catch (_e) {
    values = {};
  }
  form.addEventListener("input", function (ev) {
    if (ev.target.name) values[ev.target.name] = ev.target.value.trim();
    syncBlanks(null);
  });
  document.getElementById("em-fill-clear").addEventListener("click", function () {
    form.reset();
    values = {};
    syncBlanks(null);
  });

  picker.hidden = false;
  document.getElementById("em-filterbar").hidden = false;
  workspace.classList.add("is-ready");
  syncBlanks(null);
  var fromHash = items.filter(function (item) {
    return "#" + item.id === location.hash;
  })[0];
  select(fromHash || items[0], false);
  paint();
  if (fromHash) document.getElementById("em-examples").scrollIntoView();

  var reveals = document.querySelectorAll("[data-em-reveal]");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      el.classList.add("em-will-reveal");
      observer.observe(el);
    });
  }
})();
