const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "shopee-orders", label: "Shopee Orders", icon: "shopping-bag" },
  { id: "tiktok-orders", label: "TikTok Orders", icon: "music-2" },
  { id: "stock-summary", label: "Stock Summary", icon: "boxes" },
  { id: "batch-status", label: "Batch Status", icon: "flask-conical" },
  { id: "hpp-per-batch", label: "HPP per Batch", icon: "banknote" },
  { id: "return-order", label: "Return Order", icon: "rotate-ccw" }
];

export function isSidebarCollapsed() {
  return localStorage.getItem("sdpSidebarCollapsed") === "true";
}

export function renderSidebar(currentPage) {
  const collapsed = isSidebarCollapsed();

  return `
    <aside
      id="sidebar"
      class="fixed left-0 top-0 z-30 h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-sdp-900 to-sdp-700 px-4 py-5 text-white transition-all duration-300"
    >
      <div class="mb-8 flex items-center justify-between gap-3">
        <div class="min-w-0 ${collapsed ? "hidden" : "block"}">
          <div class="text-lg font-extrabold tracking-tight">SDP Ops</div>
          <div class="mt-1 text-[11px] font-medium text-white/65">
            Maintaining Stock Dashboard
          </div>
        </div>

        <button
          id="sidebar-toggle"
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white/20"
          title="${collapsed ? "Expand sidebar" : "Collapse sidebar"}"
        >
          <i data-lucide="${collapsed ? "panel-right-open" : "panel-left-close"}" class="h-5 w-5"></i>
        </button>
      </div>

      <nav class="space-y-2">
        ${menuItems.map(item => {
          const active = item.id === currentPage;

          return `
            <button
              data-page="${item.id}"
              type="button"
              class="menu-item group flex w-full items-center ${
                collapsed ? "justify-center px-0" : "justify-start gap-3 px-3.5"
              } rounded-2xl py-3 text-left text-sm font-bold transition-all ${
                active
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:bg-white/12 hover:text-white"
              }"
              title="${item.label}"
            >
              <i data-lucide="${item.icon}" class="h-5 w-5 shrink-0"></i>
              <span class="sidebar-text ${collapsed ? "hidden" : "block"}">
                ${item.label}
              </span>
            </button>
          `;
        }).join("")}
      </nav>
    </aside>
  `;
}

export function getSidebarMainClass() {
  return isSidebarCollapsed()
    ? "ml-20 min-h-screen px-6 py-5 transition-all duration-300"
    : "ml-64 min-h-screen px-6 py-5 transition-all duration-300";
}

export function bindSidebarEvents({ onNavigate, onToggle }) {
  document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;
      if (typeof onNavigate === "function") onNavigate(page);
    });
  });

  const toggleButton = document.getElementById("sidebar-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const next = !isSidebarCollapsed();
      localStorage.setItem("sdpSidebarCollapsed", String(next));
      if (typeof onToggle === "function") onToggle(next);
    });
  }
}
