
export async function withSpinner(button, spinnerText, asyncFunc, delay = 2000) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<span class="spinner"></span> ${spinnerText}`;

  await new Promise((resolve) => requestAnimationFrame(resolve));


  // Optional delay before executing async function
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Execute the async function
  await asyncFunc();

  // Restore button
  button.disabled = false;
  button.innerHTML = originalText;
}

export function showToast(message, duration = 2500) {
  // Check if container exists, else create
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  // Show toast
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove toast after duration
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
}

