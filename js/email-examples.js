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
  var filter = "all";
  var selected = null;

  function slug(text) {
    return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var items = cards.map(function (card) {
    var title = card.querySelector("h3").textContent;
    var tag = card.querySelector(".em-tag");
    var pres = card.querySelectorAll(".em-pre");
    pres.forEach(function (pre) {
      pre.setAttribute("data-original", pre.textContent || "");
    });

    var actions = document.createElement("div");
    actions.className = "em-mail-actions";
    actions.innerHTML =
      '<button type="button" class="em-btn em-copy-all">Copy full email</button>' +
      '<button type="button" class="em-btn em-btn-ghost em-open-gmail">Open in Gmail</button>' +
      '<button type="button" class="em-btn em-btn-ghost em-open-mailto">Open in mail app</button>' +
      '<p class="em-blanks" aria-live="polite"></p>';
    card.querySelector(".em-card-top").insertAdjacentElement("afterend", actions);

    var to = document.createElement("p");
    to.className = "em-to";
    to.innerHTML = "To: <strong>the address on the official posting</strong>";
    actions.insertAdjacentElement("afterend", to);

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

  function fillValues() {
    return {
      name: form.elements.name.value.trim(),
      role: form.elements.role.value.trim(),
      company: form.elements.company.value.trim(),
      city: form.elements.city.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
    };
  }

  function applyFill(text, v) {
    var out = text;
    function rep(token, value) {
      if (value) out = out.split(token).join(value);
    }
    rep("[Your Name]", v.name);
    rep("[Name]", v.name);
    rep("[Job Title]", v.role);
    rep("[Role / Team]", v.role);
    rep("[Company]", v.company);
    rep("[City]", v.city);
    rep("[phone]", v.phone);
    rep("[Phone]", v.phone);
    rep("[email]", v.email);
    rep("[Email]", v.email);
    return out;
  }

  function refresh() {
    var v = fillValues();
    items.forEach(function (item) {
      var blanks = 0;
      item.card.querySelectorAll(".em-pre").forEach(function (pre) {
        var text = applyFill(pre.getAttribute("data-original") || "", v);
        blanks += (text.match(/\[[^\]]+\]/g) || []).length;
        pre.innerHTML = escapeHtml(text).replace(/\[[^\]]+\]/g, "<mark>$&</mark>");
      });
      var label = item.card.querySelector(".em-blanks");
      label.textContent = blanks
        ? blanks + (blanks === 1 ? " blank" : " blanks") + " left to fill"
        : "Ready to send";
      label.classList.toggle("is-done", !blanks);
    });
    try {
      sessionStorage.setItem(STORE, JSON.stringify(v));
    } catch (_e) {
      /* details just will not survive a reload */
    }
  }

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
    var blocks = card.querySelectorAll(".em-block .em-pre");
    return {
      subject: (blocks[0] ? blocks[0].textContent : "").trim(),
      body: (blocks[1] ? blocks[1].textContent : "").trim(),
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

  document.addEventListener("click", function (ev) {
    var copy = ev.target.closest(".em-copy");
    if (copy) {
      var pre = copy.closest(".em-block").querySelector(".em-pre");
      flash(copy, pre.textContent || "");
      return;
    }
    var card = ev.target.closest(".em-card");
    if (!card) return;
    var parts = cardParts(card);
    if (ev.target.closest(".em-copy-all")) {
      flash(ev.target.closest(".em-copy-all"), "Subject: " + parts.subject + "\n\n" + parts.body);
    } else if (ev.target.closest(".em-open-gmail")) {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&su=" +
          encodeURIComponent(parts.subject) +
          "&body=" +
          encodeURIComponent(parts.body),
        "_blank",
        "noopener"
      );
    } else if (ev.target.closest(".em-open-mailto")) {
      location.href =
        "mailto:?subject=" + encodeURIComponent(parts.subject) + "&body=" + encodeURIComponent(parts.body);
    }
  });

  try {
    var saved = JSON.parse(sessionStorage.getItem(STORE) || "{}");
    Object.keys(saved).forEach(function (key) {
      if (form.elements[key]) form.elements[key].value = saved[key];
    });
  } catch (_e) {
    /* start with empty details */
  }
  form.addEventListener("input", refresh);
  document.getElementById("em-fill-clear").addEventListener("click", function () {
    form.reset();
    refresh();
  });

  picker.hidden = false;
  document.getElementById("em-filterbar").hidden = false;
  workspace.classList.add("is-ready");
  refresh();
  var fromHash = items.filter(function (item) {
    return "#" + item.id === location.hash;
  })[0];
  select(fromHash || items[0], false);
  paint();
})();
