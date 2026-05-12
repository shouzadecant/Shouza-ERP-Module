import { renderRoute } from "./router.js";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "shopee-orders", label: "Shopee Orders", icon: "shopping-bag" },
  { id: "tiktok-orders", label: "TikTok Orders", icon: "music-2" },
  { id: "stock-summary", label: "Stock Summary", icon: "boxes" },
  { id: "batch-status", label: "Batch Status", icon: "flask-conical" },
  { id: "hpp-per-batch", label: "HPP per Batch", icon: "banknote" },
  { id: "return-order", label: "Return Order", icon: "rotate-ccw" }
];

let currentPage = "dashboard";

function renderShell() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div class="min-h-screen bg-slate-50">
      <aside class="fixed left-0 top-0 z-30 h-screen w-72 bg-gradient-to-b from-sdp-700 to-sdp-500 px-5 py-6 text-white">
        <div class="mb-8">
          <div class="text-xl font-extrabold tracking-tight">SDP Ops</div>
          <div class="mt-1 text-xs font-medium text-white/70">Maintaining Stock Dashboard</div>
        </div>

        <nav class="space-y-2">
          ${menuItems.map(item => `
            <button
              data-page="${item.id}"
              class="menu-item flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all hover:bg-white/15 ${
                item.id === currentPage ? "bg-white/20 shadow-sm" : "bg-white/8"
              }"
            >
              <i data-lucide="${item.icon}" class="h-4 w-4"></i>
              <span>${item.label}</span>
            </button>
          `).join("")}
        </nav>
      </aside>

      <main class="ml-72 min-h-screen p-7">
        <header class="mb-6 flex items-center justify-between gap-4">
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
            class="inline-flex items-center gap-2 rounded-xl bg-sdp-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-sdp-900"
          >
            <i data-lucide="rotate-cw" class="h-4 w-4"></i>
            Refresh
          </button>
        </header>

        <section id="page-content"></section>
      </main>
    </div>
  `;

  bindShellEvents();
  renderCurrentPage();
  refreshIcons();
}

function bindShellEvents() {
  document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", () => {
      currentPage = button.dataset.page;
      renderShell();
    });
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

  document.querySelectorAll(".menu-item").forEach(button => {
    button.classList.toggle("bg-white/20", button.dataset.page === currentPage);
  });

  refreshIcons();
}

export function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

renderShell();
