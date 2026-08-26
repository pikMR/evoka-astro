const form = document.querySelector("#product-form");
const categorySelect = document.querySelector("#category");
const newCategoryField = document.querySelector("#new-category-field");
const newCategoryInput = document.querySelector("#new-category");
const descriptionEditor = document.querySelector("#description");
const imageInput = document.querySelector("#images");
const imageList = document.querySelector("#image-list");
const formError = document.querySelector("#form-error");
const previewEmpty = document.querySelector("#preview-empty");
const previewContent = document.querySelector("#preview-content");
const successPanel = document.querySelector("#success-panel");
const confirmCheck = document.querySelector("#confirm-check");
const commitButton = document.querySelector("#commit-button");
const loadingOverlay = document.querySelector("#loading-overlay");
const loadingTitle = document.querySelector("#loading-title");
const loadingDetail = document.querySelector("#loading-detail");
let previewToken = "";
let selectedFiles = [];
let previewUrls = [];

initialize();

async function initialize() {
  wireEditorToolbar();
  wireImagePicker();
  wireForm();
  try {
    const data = await api("/api/catalog");
    categorySelect.replaceChildren(new Option("Selecciona una categoría", ""));
    for (const category of data.categories) categorySelect.add(new Option(category, category));
    categorySelect.add(new Option("＋ Crear una categoría nueva", "__new__"));
  } catch (error) {
    showError(error.message);
  }
}

function wireEditorToolbar() {
  document.querySelectorAll(".toolbar button").forEach((button) => {
    button.addEventListener("mousedown", (event) => event.preventDefault());
    button.addEventListener("click", () => {
      descriptionEditor.focus();
      if (button.dataset.command) document.execCommand(button.dataset.command, false);
      if (button.dataset.block) document.execCommand("formatBlock", false, button.dataset.block);
      if (button.hasAttribute("data-link")) {
        const url = window.prompt("URL del enlace (https://, mailto: o tel:)");
        if (url) document.execCommand("createLink", false, url);
      }
      invalidatePreview();
    });
  });
}

function wireImagePicker() {
  imageInput.addEventListener("change", () => setSelectedFiles([...imageInput.files]));
  const dropzone = document.querySelector("#dropzone");
  for (const eventName of ["dragenter", "dragover"]) {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("is-dragging");
    });
  }
  for (const eventName of ["dragleave", "drop"]) {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.remove("is-dragging");
    });
  }
  dropzone.addEventListener("drop", (event) => {
    const files = [...event.dataTransfer.files].filter((file) => file.type.startsWith("image/"));
    setSelectedFiles(files);
  });
}

function setSelectedFiles(files) {
  selectedFiles = files.slice(0, 8);
  previewUrls.forEach(URL.revokeObjectURL);
  previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
  imageList.replaceChildren();
  selectedFiles.forEach((file, index) => {
    const item = document.createElement("article");
    item.className = "image-item";
    const image = document.createElement("img");
    image.src = previewUrls[index];
    image.alt = "";
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = file.name;
    const size = document.createElement("small");
    size.textContent = formatBytes(file.size);
    details.append(name, size);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Quitar ${file.name}`);
    remove.addEventListener("click", () => setSelectedFiles(selectedFiles.filter((_, current) => current !== index)));
    item.append(image, details, remove);
    imageList.append(item);
  });
  invalidatePreview();
}

function wireForm() {
  categorySelect.addEventListener("change", () => {
    const creating = categorySelect.value === "__new__";
    newCategoryField.classList.toggle("is-hidden", !creating);
    newCategoryInput.required = creating;
    if (!creating) newCategoryInput.value = "";
    invalidatePreview();
  });
  form.addEventListener("input", invalidatePreview);
  descriptionEditor.addEventListener("input", invalidatePreview);
  form.addEventListener("submit", createPreview);
  confirmCheck.addEventListener("change", () => {
    commitButton.disabled = !confirmCheck.checked;
  });
  commitButton.addEventListener("click", commitProduct);
  document.querySelector("#new-product-button").addEventListener("click", resetForm);
}

async function createPreview(event) {
  event.preventDefault();
  hideError();
  if (!form.reportValidity()) return;
  if (!descriptionEditor.textContent.trim()) return showError("La descripción es obligatoria.");
  if (!selectedFiles.length) return showError("Añade al menos una imagen.");
  setLoading(true, "Preparando vista previa…", "Las imágenes se están convirtiendo a JPG.");
  try {
    const images = [];
    for (const file of selectedFiles) {
      images.push({ name: file.name, dataUrl: await convertToJpeg(file) });
    }
    const data = await api("/api/preview", {
      name: form.elements.name.value,
      category: categorySelect.value === "__new__" ? "" : categorySelect.value,
      newCategory: categorySelect.value === "__new__" ? newCategoryInput.value : "",
      reference: form.elements.reference.value,
      price: form.elements.price.value,
      stock: form.elements.stock.value || 0,
      description: descriptionEditor.innerHTML,
      images,
    });
    previewToken = data.token;
    renderPreview(data);
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

async function convertToJpeg(file) {
  let source;
  try {
    source = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(`No se ha podido leer “${file.name}” como imagen.`);
  }
  const maximumSide = 2400;
  const scale = Math.min(1, maximumSide / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(source, 0, 0, width, height);
  source.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
  if (!blob) throw new Error(`No se ha podido convertir “${file.name}” a JPG.`);
  return await blobToDataUrl(blob);
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se ha podido preparar una imagen."));
    reader.readAsDataURL(blob);
  });
}

function renderPreview(data) {
  previewEmpty.classList.add("is-hidden");
  successPanel.classList.add("is-hidden");
  previewContent.classList.remove("is-hidden");
  document.querySelector("#preview-category").textContent = data.category.isNew
    ? `${data.category.label} · nueva categoría`
    : data.category.label;
  document.querySelector("#preview-name").textContent = data.product.name;
  document.querySelector("#preview-price").textContent =
    data.product.price === 0
      ? "Consultar"
      : new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(data.product.price);
  for (const field of ["id", "reference", "slug", "stock"]) {
    document.querySelector(`#preview-${field}`).textContent = data.product[field];
  }
  document.querySelector("#preview-description").innerHTML = data.product.description;
  const imageGrid = document.querySelector("#preview-image-grid");
  imageGrid.replaceChildren();
  data.images.forEach((image, index) => {
    const figure = document.createElement("figure");
    const element = document.createElement("img");
    element.src = previewUrls[index];
    element.alt = `Vista previa de ${data.product.name}`;
    const caption = document.createElement("figcaption");
    caption.textContent = `${image.id}.jpg · ${formatBytes(image.bytes)}`;
    figure.append(element, caption);
    imageGrid.append(figure);
  });
  const warnings = document.querySelector("#preview-warnings");
  warnings.replaceChildren();
  data.warnings.forEach((message) => {
    const notice = document.createElement("p");
    notice.className = "notice notice-warning";
    notice.textContent = message;
    warnings.append(notice);
  });
  const files = document.querySelector("#preview-files");
  files.replaceChildren(...data.files.map((file) => {
    const item = document.createElement("li");
    item.textContent = file;
    return item;
  }));
  confirmCheck.checked = false;
  commitButton.disabled = true;
  document.querySelector("#preview-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function commitProduct() {
  if (!previewToken || !confirmCheck.checked) return;
  setLoading(true, "Guardando producto…", "Se ejecutarán la auditoría completa y el build de Astro.");
  try {
    const data = await api("/api/commit", { token: previewToken });
    previewToken = "";
    previewContent.classList.add("is-hidden");
    successPanel.classList.remove("is-hidden");
    document.querySelector("#success-title").textContent = data.message;
    document.querySelector("#success-files").replaceChildren(...data.files.map((file) => {
      const item = document.createElement("li");
      item.textContent = file;
      return item;
    }));
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

function invalidatePreview() {
  if (!previewToken) return;
  previewToken = "";
  previewContent.classList.add("is-hidden");
  previewEmpty.classList.remove("is-hidden");
}

function resetForm() {
  form.reset();
  form.elements.stock.value = 0;
  descriptionEditor.innerHTML = "";
  newCategoryField.classList.add("is-hidden");
  newCategoryInput.required = false;
  setSelectedFiles([]);
  successPanel.classList.add("is-hidden");
  previewEmpty.classList.remove("is-hidden");
  hideError();
  form.elements.name.focus();
}

async function api(url, body) {
  const response = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "No se ha podido completar la operación.");
  return data;
}

function showError(message) {
  formError.textContent = message;
  formError.classList.remove("is-hidden");
  formError.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hideError() {
  formError.classList.add("is-hidden");
  formError.textContent = "";
}

function setLoading(visible, title = "", detail = "") {
  loadingOverlay.classList.toggle("is-hidden", !visible);
  if (title) loadingTitle.textContent = title;
  if (detail) loadingDetail.textContent = detail;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
