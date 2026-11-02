(function () {
  const form = document.getElementById("ns-form");
  if (!form) return;

  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
  const image = document.getElementById("ns-image");
  const drop = document.getElementById("ns-drop");
  const dropEmpty = document.getElementById("ns-drop-empty");
  const dropFile = document.getElementById("ns-drop-file");
  const preview = document.getElementById("ns-preview");
  const errorEl = document.getElementById("ns-error");
  const sent = document.getElementById("ns-sent");
  const media = document.getElementById("ns-pv-media");
  const submit = form.querySelector(".ns-submit");
  const el = (id) => document.getElementById(id);
  let objectUrl = "";

  if (new URLSearchParams(location.search).get("sent") === "1" && sent) {
    sent.hidden = false;
  }

  function imageProblem() {
    const file = image.files && image.files[0];
    if (!file) return "";
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return "Use a JPG, PNG or WebP image.";
    if (file.size > MAX_IMAGE_BYTES) return "The image must be 5 MB or smaller.";
    return "";
  }

  function showImage() {
    const problem = imageProblem();
    const file = image.files && image.files[0];
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = "";
    if (problem) {
      errorEl.textContent = problem;
      image.value = "";
    } else if (errorEl.textContent.indexOf("image") !== -1) {
      errorEl.textContent = "";
    }
    const ok = file && !problem;
    if (ok) objectUrl = URL.createObjectURL(file);
    drop.classList.toggle("has-file", !!ok);
    dropEmpty.hidden = !!ok;
    dropFile.hidden = !ok;
    preview.src = ok ? objectUrl : "";
    el("ns-file-name").textContent = ok ? file.name : "";
    el("ns-file-size").textContent = ok ? (file.size / (1024 * 1024)).toFixed(1) + " MB" : "";
    media.style.backgroundImage = ok ? "url(" + JSON.stringify(objectUrl) + ")" : "";
    media.classList.toggle("has-image", !!ok);
  }

  image.addEventListener("change", showImage);
  el("ns-remove").addEventListener("click", function () {
    image.value = "";
    showImage();
  });
  ["dragenter", "dragover"].forEach(function (name) {
    drop.addEventListener(name, function () {
      drop.classList.add("is-over");
    });
  });
  ["dragleave", "drop"].forEach(function (name) {
    drop.addEventListener(name, function () {
      drop.classList.remove("is-over");
    });
  });

  function value(name) {
    const field = form.elements[name];
    return field ? String(field.value || "").trim() : "";
  }

  function refresh() {
    el("ns-pv-title").textContent = value("title") || "Your headline appears here";
    el("ns-pv-caption").textContent = value("caption") || "Your caption appears here, in one or two lines.";
    el("ns-pv-label").textContent = value("label") || "Label";
    el("ns-pv-location").textContent = value("location") || "Location";
    const type = form.querySelector('input[name="type"]:checked');
    el("ns-pv-type").textContent = type ? type.value : "News";
    const credit = [value("name"), value("credit")].filter(Boolean).join(", ");
    el("ns-pv-credit").textContent = credit || "Your name";
    document.querySelectorAll(".ns-count").forEach(function (counter) {
      const field = form.elements[counter.getAttribute("data-for")];
      counter.textContent = field.value.length + " / " + field.maxLength;
    });
  }

  form.addEventListener("input", function (event) {
    const wrap = event.target.closest(".ns-field");
    if (wrap && event.target.checkValidity()) wrap.classList.remove("is-invalid");
    refresh();
  });
  form.addEventListener("change", refresh);

  form.addEventListener("submit", function (event) {
    form.querySelectorAll(".ns-field.is-invalid").forEach(function (wrap) {
      wrap.classList.remove("is-invalid");
    });
    const problem = imageProblem();
    const invalid = Array.prototype.filter.call(form.elements, function (field) {
      return field.willValidate && !field.checkValidity();
    });
    if (problem || invalid.length) {
      event.preventDefault();
      invalid.forEach(function (field) {
        const wrap = field.closest(".ns-field");
        if (wrap) wrap.classList.add("is-invalid");
      });
      const first = invalid[0];
      errorEl.textContent =
        problem ||
        (first && first.name === "confirmation"
          ? "Please confirm the statement above to send your story."
          : "Please fix the highlighted fields.");
      if (first) first.focus();
      return;
    }
    errorEl.textContent = "";
    form.elements._replyto.value = value("email");
    const type = form.querySelector('input[name="type"]:checked');
    form.elements._subject.value = ((type ? type.value : "News") + " submission: " + value("title")).slice(0, 180);
    submit.disabled = true;
    submit.textContent = "Sending…";
  });

  refresh();
})();
