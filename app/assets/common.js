function initSidebar() {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const sidebarCloseButton = document.querySelector(".sidebar-close");
  const sidebarOverlay = document.querySelector("[data-sidebar-overlay]");
  const sidebar = document.querySelector(".sidebar");
  const sidebarLinks = document.querySelectorAll(".sidebar .nav-link");
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  let previouslyFocused = null;

  function syncSidebarAccessibility() {
    if (!sidebar) return;

    const isOpen = document.body.classList.contains("sidebar-open");
    if (mobileQuery.matches) {
      sidebar.setAttribute("aria-hidden", String(!isOpen));
      sidebar.inert = !isOpen;
      if (sidebarOverlay) {
        sidebarOverlay.setAttribute("aria-hidden", String(!isOpen));
      }
    } else {
      sidebar.removeAttribute("aria-hidden");
      sidebar.inert = false;
      if (sidebarOverlay) {
        sidebarOverlay.setAttribute("aria-hidden", "true");
      }
    }
  }

  function openSidebar() {
    previouslyFocused = document.activeElement;
    document.body.classList.add("sidebar-open");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", "true");
    }
    syncSidebarAccessibility();
    window.requestAnimationFrame(() => sidebarCloseButton?.focus());
  }

  function closeSidebar(restoreFocus = true) {
    document.body.classList.remove("sidebar-open");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", "false");
    }
    syncSidebarAccessibility();
    if (restoreFocus && previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  }

  if (hamburgerButton) {
    hamburgerButton.addEventListener("click", () => {
      if (document.body.classList.contains("sidebar-open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => closeSidebar(false));
  });

  window.FreelaBoardDemo?.preserveDemoLinks();
  syncSidebarAccessibility();

  const handleViewportChange = () => {
    if (!mobileQuery.matches) {
      document.body.classList.remove("sidebar-open");
      hamburgerButton?.setAttribute("aria-expanded", "false");
    }
    syncSidebarAccessibility();
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else {
    mobileQuery.addListener(handleViewportChange);
  }

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

function initHorizontalScrollHints() {
  const selector = ".invoice-scroll, .calendar-scroll, .sales-chart-scroll, .filter-buttons";
  const containers = Array.from(document.querySelectorAll(selector));

  containers.forEach((container, index) => {
    if (container.dataset.fbScrollReady === "true") return;

    container.dataset.fbScrollReady = "true";
    container.tabIndex = container.tabIndex >= 0 ? container.tabIndex : 0;

    const hint = makeElement("p", "fb-scroll-hint");
    hint.id = `fb-scroll-hint-${index}`;
    hint.setAttribute("aria-hidden", "true");
    container.insertAdjacentElement("beforebegin", hint);
    container.setAttribute("aria-describedby", hint.id);

    const update = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const isScrollable = maxScrollLeft > 4;

      hint.classList.toggle("is-visible", isScrollable);
      if (!isScrollable) {
        hint.textContent = "";
        return;
      }

      if (container.scrollLeft <= 4) {
        hint.textContent = "横にスクロールできます →";
      } else if (container.scrollLeft >= maxScrollLeft - 4) {
        hint.textContent = "← 左へ戻れます";
      } else {
        hint.textContent = "← 横にスクロールできます →";
      }
    };

    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    if (typeof ResizeObserver === "function") {
      const observer = new ResizeObserver(update);
      observer.observe(container);
      const child = container.firstElementChild;
      if (child) observer.observe(child);
    }

    update();
    window.setTimeout(update, 500);
    window.setTimeout(update, 1500);
  });
}

function enhanceResponsiveTables() {
  const tables = Array.from(document.querySelectorAll(".table-wrap table"));

  tables.forEach((table) => {
    if (table.dataset.fbResponsiveTable === "true") return;
    table.dataset.fbResponsiveTable = "true";

    const updateLabels = () => {
      const headers = Array.from(table.querySelectorAll("thead th")).map((header) => {
        return header.textContent.trim();
      });

      table.querySelectorAll("tbody tr").forEach((row) => {
        const cells = Array.from(row.children).filter((cell) => cell.tagName === "TD");

        cells.forEach((cell, index) => {
          if (cell.colSpan > 1 || cell.classList.contains("message")) {
            cell.classList.add("fb-table-message");
            cell.removeAttribute("data-label");
            return;
          }

          cell.dataset.label = headers[index] || "";
        });
      });
    };

    updateLabels();

    const tbody = table.querySelector("tbody");
    if (tbody && typeof MutationObserver === "function") {
      const observer = new MutationObserver(updateLabels);
      observer.observe(tbody, { childList: true, subtree: true });
    }
  });
}

function showConfirmDialog(options) {
  const title = options.title || "確認";
  const message = options.message || "";
  const confirmText = options.confirmText || "実行";
  const cancelText = options.cancelText || "キャンセル";
  const tone = options.tone || "primary";

  return new Promise((resolve) => {
    const previouslyFocused = document.activeElement;
    const overlay = makeElement("div", "fb-confirm-overlay");
    const dialog = makeElement("section", "fb-confirm-dialog");
    const heading = makeElement("h2", "fb-confirm-title", title);
    const body = makeElement("p", "fb-confirm-message", message);
    const actions = makeElement("div", "fb-confirm-actions");
    const cancelButton = makeElement("button", "fb-confirm-button", cancelText);
    const confirmButton = makeElement("button", `fb-confirm-button ${tone}`, confirmText);

    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    const dialogId = `fb-confirm-${Date.now()}`;
    heading.id = `${dialogId}-title`;
    body.id = `${dialogId}-message`;
    dialog.setAttribute("aria-labelledby", heading.id);
    dialog.setAttribute("aria-describedby", body.id);
    cancelButton.type = "button";
    confirmButton.type = "button";

    actions.append(cancelButton, confirmButton);
    dialog.append(heading, body, actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    confirmButton.focus();

    let isFinished = false;

    function finish(value) {
      if (isFinished) return;
      isFinished = true;
      document.removeEventListener("keydown", handleKeydown);
      overlay.remove();
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
      resolve(value);
    }

    cancelButton.addEventListener("click", () => finish(false));
    confirmButton.addEventListener("click", () => finish(true));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        finish(false);
      }
    });
    function handleKeydown(event) {
      if (event.key === "Escape") {
        finish(false);
        return;
      }
      if (event.key === "Tab") {
        const target = event.shiftKey ? cancelButton : confirmButton;
        if (
          (event.shiftKey && document.activeElement === cancelButton) ||
          (!event.shiftKey && document.activeElement === confirmButton)
        ) {
          event.preventDefault();
          target === cancelButton ? confirmButton.focus() : cancelButton.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
  });
}

window.FreelaBoard = {
  initSidebar,
  enhanceResponsiveTables,
  initHorizontalScrollHints,
  makeElement,
  clearElement,
  showConfirmDialog
};

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  enhanceResponsiveTables();
  initHorizontalScrollHints();
});
