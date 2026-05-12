import { renderRoute } from "./router.js";
import {
  renderSidebar,
  bindSidebarEvents,
  getSidebarMainClass
} from "./components/sidebar.js";

let currentPage = localStorage.getItem("sdpCurrentPage") || "dashboard";

function renderShell() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div class="min-h-screen bg-slate-50">
      ${renderSidebar(currentPage)}

      <main class="${getSidebarMainClass()}">
        <header class="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4">
          <div>
            <h1 id="page-title" class="text-2xl font-extrabold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p id="page-subtitle" class="mt-1 text-sm font-medium text-slate-500">
              Build UI modular untuk SDP Maintaining Stock.
            </p>
          </div>

          <button
            id="refresh-page"
            class="inline-flex items-center gap-2 rounded-xl bg-sdp-700 px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-sdp-900"
          >
            <i data-lucide="rotate-cw" class="h-4 w-4"></i>
            Refresh
          </button>
        </header>

        <section id="page-content" class="mx-auto max-w-7xl"></section>
      </main>
    </div>
  `;

  bindShellEvents();
  renderCurrentPage();
  refreshIcons();
}

function bindShellEvents() {
  bindSidebarEvents({
    onNavigate: page => {
      currentPage = page;
      localStorage.setItem("sdpCurrentPage", page);
      renderShell();
    },
    onToggle: () => {
      renderShell();
    }
  });

  const refreshButton = document.getElementById("refresh-page");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      renderCurrentPage();
    });
  }
}

function renderCurrentPage() {
  renderRoute(currentPage);
  refreshIcons();
}

export function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

renderShell();
