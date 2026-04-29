function initSidebar() {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const sidebarCloseButton = document.querySelector(".sidebar-close");
  const sidebarOverlay = document.querySelector("[data-sidebar-overlay]");
  const sidebarLinks = document.querySelectorAll(".sidebar .nav-link");

  function openSidebar() {
    document.body.classList.add("sidebar-open");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", "false");
    }
  }

  if (hamburgerButton) {
    hamburgerButton.addEventListener("click", openSidebar);
  }

  if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined && text !== null) {
    element.textContent = text;
  }
  return element;
}

function clearElement(element) {
  if (!element) return;
  element.replaceChildren();
}

function showConfirmDialog(options) {
  const title = options.title || "確認";
  const message = options.message || "";
  const confirmText = options.confirmText || "実行";
  const cancelText = options.cancelText || "キャンセル";
  const tone = options.tone || "primary";

  return new Promise((resolve) => {
    const overlay = makeElement("div", "fb-confirm-overlay");
    const dialog = makeElement("section", "fb-confirm-dialog");
    const heading = makeElement("h2", "fb-confirm-title", title);
    const body = makeElement("p", "fb-confirm-message", message);
    const actions = makeElement("div", "fb-confirm-actions");
    const cancelButton = makeElement("button", "fb-confirm-button", cancelText);
    const confirmButton = makeElement("button", `fb-confirm-button ${tone}`, confirmText);

    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    cancelButton.type = "button";
    confirmButton.type = "button";

    actions.append(cancelButton, confirmButton);
    dialog.append(heading, body, actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    confirmButton.focus();

    function finish(value) {
      overlay.remove();
      resolve(value);
    }

    cancelButton.addEventListener("click", () => finish(false));
    confirmButton.addEventListener("click", () => finish(true));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        finish(false);
      }
    });
    document.addEventListener("keydown", function handleKeydown(event) {
      if (!document.body.contains(overlay)) {
        document.removeEventListener("keydown", handleKeydown);
        return;
      }
      if (event.key === "Escape") {
        document.removeEventListener("keydown", handleKeydown);
        finish(false);
      }
    });
  });
}

window.FreelaBoard = {
  initSidebar,
  makeElement,
  clearElement,
  showConfirmDialog
};

document.addEventListener("DOMContentLoaded", initSidebar);
