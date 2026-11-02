(function () {
  const form = document.getElementById("ns-form");
  if (!form) return;

  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
  const image = document.getElementById("ns-image");
  const preview = document.getElementById("ns-preview");
  const errorEl = document.getElementById("ns-error");
  const sent = document.getElementById("ns-sent");
  const replyTo = form.elements._replyto;
  const emailInput = form.elements.email;
  const subject = form.elements._subject;
  const titleInput = form.elements.title;

  if (new URLSearchParams(location.search).get("sent") === "1" && sent) {
    sent.hidden = false;
    sent.scrollIntoView({ block: "center" });
  }

  function imageProblem() {
    const file = image.files && image.files[0];
    if (!file) return "";
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return "Use a JPG, PNG or WebP image.";
    if (file.size > MAX_IMAGE_BYTES) return "The image must be 5 MB or smaller.";
    return "";
  }

  image.addEventListener("change", function () {
    const problem = imageProblem();
    errorEl.textContent = problem;
    if (preview.src) URL.revokeObjectURL(preview.src);
    const file = image.files && image.files[0];
    if (file && !problem) {
      preview.src = URL.createObjectURL(file);
      preview.hidden = false;
    } else {
      preview.removeAttribute("src");
      preview.hidden = true;
    }
  });

  form.addEventListener("submit", function (event) {
    const problem = imageProblem();
    if (problem) {
      event.preventDefault();
      errorEl.textContent = problem;
      return;
    }
    errorEl.textContent = "";
    replyTo.value = emailInput.value.trim();
    const type = form.querySelector('input[name="type"]:checked');
    subject.value = `${type ? type.value : "News"} submission: ${titleInput.value.trim()}`.slice(0, 180);
  });
})();
