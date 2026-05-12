const menuGroups = [
  {
    section: "Main Menu",
    items: [
      {
        id: "dashboard",
        label: "Operational Dashboard",
        icon: "layout-dashboard",
        type: "single",
        color: "text-indigo-400",
        activeColor: "bg-indigo-600"
      },
      {
        id: "summary",
        label: "Business Summary",
        icon: "pie-chart",
        type: "single",
        color: "text-sky-400",
        activeColor: "bg-sky-600"
      },
      {
        id: "orders",
        label: "Order Management",
        icon: "shopping-cart",
        type: "group",
        color: "text-orange-400",
        activeColor: "bg-orange-500",
        children: [
          { id: "shopee-orders", label: "Shopee" },
          { id: "sellercenter-orders", label: "SellerCenter" },
          { id: "tiktok-orders", label: "TikTok" },
          { id: "return-order", label: "Return Orders" }
        ]
      },
      {
        id: "ads",
        label: "Ads Performance",
        icon: "megaphone",
        type: "group",
        color: "text-pink-400",
        activeColor: "bg-pink-500",
        children: [
          { id: "ads-shopee", label: "Shopee Ads" },
          { id: "ads-sellercenter", label: "SellerCenter Ads" }
        ]
      },
      {
        id: "finance",
        label: "Finance & Saldo",
        icon: "wallet",
        type: "group",
        color: "text-emerald-400",
        activeColor: "bg-emerald-500",
        children: [
          { id: "saldo-shopee", label: "Saldo Shopee" },
          { id: "saldo-sellercenter", label: "Saldo SellerCenter" },
          { id: "hpp-per-batch", label: "HPP per Batch" }
        ]
      },
      {
        id: "inventory",
        label: "Maintaining Stock",
        icon: "boxes",
        type: "group",
        color: "text-lime-400",
        activeColor: "bg-lime-600",
        children: [
          { id: "bemlperday", label: "BEMLPERDAY" },
          { id: "stock-summary", label: "Stock Summary" },
          { id: "batch-status", label: "Batch Status" },
          { id: "scan-paket", label: "Scan Paket" },
          { id: "return-stock", label: "Return Stock" }
        ]
      }
    ]
  },
  {
    section: "System",
    items: [
      {
        id: "settings",
        label: "Setting",
        icon: "settings",
        type: "group",
        color: "text-slate-400",
        activeColor: "bg-slate-500",
        children: [
          { id: "users", label: "Manage Users" },
          { id: "products", label: "Manage Products" },
          { id: "activity-log", label: "Activity Logs" },
          { id: "profile", label: "Profile" }
        ]
      }
    ]
  }
];

function getAllChildren(item) {
  return item.children || [];
}

function isGroupActive(item, currentPage) {
  return getAllChildren(item).some(child => child.id === currentPage);
}

export function isSidebarCollapsed() {
  return localStorage.getItem("sdpSidebarCollapsed") === "true";
}

export function renderSidebar(currentPage) {
  const collapsed = isSidebarCollapsed();

  return `
    <aside
      id="sidebar"
      class="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-700/50 bg-slate-900 text-slate-300 shadow-2xl transition-all duration-300 ${
        collapsed ? "w-20 sidebar-minimized" : "w-64"
      }"
    >
      <div
        id="sidebar-header"
        class="flex h-20 flex-shrink-0 items-center border-b border-slate-700 bg-slate-950 transition-all duration-300 ${
          collapsed ? "justify-center px-2" : "justify-start px-6"
        }"
      >
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
          <i data-lucide="layout-dashboard" class="h-5 w-5"></i>
        </div>

        <div class="sidebar-logo-text ml-3 min-w-0 transition-all duration-300 ${collapsed ? "hidden opacity-0" : "block opacity-100"}">
          <div class="truncate text-lg font-extrabold leading-none tracking-wide text-white">
            SDP Ops
          </div>
          <div class="mt-1 truncate text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Maintaining Stock
          </div>
        </div>
      </div>

      <nav id="sidebar-nav" class="custom-scrollbar flex-grow space-y-5 overflow-y-auto overflow-x-hidden px-4 py-6">
        ${menuGroups.map(group => `
          <div>
            <p class="sidebar-text mb-2 px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 transition-all duration-300 ${
              collapsed ? "hidden opacity-0" : "block opacity-100"
            }">
              ${group.section}
            </p>

            <div class="space-y-1">
              ${group.items.map(item => renderMenuItem(item, currentPage, collapsed)).join("")}
            </div>
          </div>
        `).join("")}
      </nav>

      <div
        id="sidebar-footer"
        class="flex-shrink-0 border-t border-slate-700 bg-slate-950 p-4 transition-all duration-300 ${
          collapsed ? "text-center" : ""
        }"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-3">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg">
              <i data-lucide="user" class="h-5 w-5"></i>
            </div>

            <div class="sidebar-text min-w-0 transition-all duration-300 ${collapsed ? "hidden opacity-0" : "block opacity-100"}">
              <p class="truncate text-sm font-extrabold text-white">Owner</p>
              <div class="mt-0.5 flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <p class="text-xs text-slate-400">Online</p>
              </div>
            </div>
          </div>

          <button
            id="logout-button"
            type="button"
            class="sidebar-text rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white ${
              collapsed ? "hidden opacity-0" : "block opacity-100"
            }"
            title="Logout"
          >
            <i data-lucide="log-out" class="h-5 w-5"></i>
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-slate-700/50 pt-4">
          <div class="sidebar-text flex gap-1 transition-all duration-300 ${collapsed ? "hidden opacity-0" : "flex opacity-100"}">
            <button
              id="theme-light-button"
              type="button"
              class="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-yellow-400"
              title="Light Mode"
            >
              <i data-lucide="sun" class="h-4 w-4"></i>
            </button>

            <button
              id="theme-dark-button"
              type="button"
              class="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-blue-400"
              title="Dark Mode"
            >
              <i data-lucide="moon" class="h-4 w-4"></i>
            </button>
          </div>

          <button
            id="sidebar-toggle"
            type="button"
            class="mx-auto flex rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            title="${collapsed ? "Expand sidebar" : "Collapse sidebar"}"
          >
            <i
              id="sidebar-toggle-icon"
              data-lucide="${collapsed ? "chevrons-right" : "chevrons-left"}"
              class="h-4 w-4"
            ></i>
          </button>
        </div>
      </div>
    </aside>
  `;
}

function renderMenuItem(item, currentPage, collapsed) {
  if (item.type === "single") {
    const active = item.id === currentPage;

    return `
      <button
        type="button"
        data-page="${item.id}"
        class="sidebar-link menu-item group flex w-full items-center rounded-xl py-3 transition-all duration-200 ${
          collapsed ? "justify-center px-2" : "justify-start px-3"
        } ${
          active
            ? "active bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }"
        title="${item.label}"
      >
        <div class="icon-box flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-700 transition-colors ${
          active ? "bg-white/20 text-white" : `${item.color} group-hover:bg-indigo-500 group-hover:text-white`
        }">
          <i data-lucide="${item.icon}" class="h-5 w-5"></i>
        </div>

        <span class="sidebar-text ml-3 whitespace-nowrap text-[13px] font-bold transition-all duration-300 ${
          collapsed ? "hidden opacity-0" : "block opacity-100"
        }">
          ${item.label}
        </span>
      </button>
    `;
  }

  const groupActive = isGroupActive(item, currentPage);
  const submenuOpen =
    groupActive ||
    localStorage.getItem(`sdpSubmenuOpen:${item.id}`) === "true";

  return `
    <div class="relative group-menu">
      <button
        type="button"
        data-menu-id="${item.id}"
        class="sidebar-menu-button group flex w-full items-center rounded-xl py-3 transition-all duration-200 ${
          collapsed ? "justify-center px-2" : "justify-between px-3"
        } ${
          groupActive
            ? "active bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }"
        title="${item.label}"
      >
        <div class="flex min-w-0 items-center">
          <div class="icon-box flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-700 transition-colors ${
            groupActive ? "bg-white/20 text-white" : `${item.color} group-hover:${item.activeColor} group-hover:text-white`
          }">
            <i data-lucide="${item.icon}" class="h-5 w-5"></i>
          </div>

          <span class="sidebar-text ml-3 whitespace-nowrap text-[13px] font-bold transition-all duration-300 ${
            collapsed ? "hidden opacity-0" : "block opacity-100"
          }">
            ${item.label}
          </span>
        </div>

        <i
          data-lucide="chevron-down"
          class="menu-arrow h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            submenuOpen ? "rotate-180" : ""
          } ${collapsed ? "hidden opacity-0" : "block opacity-100"}"
        ></i>
      </button>

      <div
        data-submenu="${item.id}"
        class="submenu mt-1 space-y-1 rounded-lg bg-slate-950 py-2 pr-2 ${
          collapsed || !submenuOpen ? "hidden" : ""
        } pl-11"
      >
        ${getAllChildren(item).map(child => `
          <button
            type="button"
            data-page="${child.id}"
            class="sidebar-sublink menu-item flex w-full items-center rounded-md px-3 py-2 text-left text-[13px] font-semibold transition-all ${
              child.id === currentPage
                ? "active bg-sky-400/10 text-sky-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }"
          >
            <span class="sidebar-text whitespace-nowrap">${child.label}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

export function getSidebarMainClass() {
  return isSidebarCollapsed()
    ? "ml-20 min-h-screen px-6 py-5 transition-all duration-300"
    : "ml-64 min-h-screen px-6 py-5 transition-all duration-300";
}

export function bindSidebarEvents({ onNavigate, onToggle }) {
  document.querySelectorAll(".sidebar-link, .sidebar-sublink").forEach(button => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;
      if (!page) return;
      if (typeof onNavigate === "function") onNavigate(page);
    });
  });

  document.querySelectorAll(".sidebar-menu-button").forEach(button => {
    button.addEventListener("click", () => {
      if (isSidebarCollapsed()) return;

      const menuId = button.dataset.menuId;
      const submenu = document.querySelector(`[data-submenu="${menuId}"]`);
      const arrow = button.querySelector(".menu-arrow");

      if (!submenu) return;

      const willOpen = submenu.classList.contains("hidden");

      document.querySelectorAll(".submenu").forEach(item => {
        if (item !== submenu) {
          item.classList.add("hidden");
          const otherId = item.dataset.submenu;
          localStorage.setItem(`sdpSubmenuOpen:${otherId}`, "false");
        }
      });

      document.querySelectorAll(".sidebar-menu-button .menu-arrow").forEach(icon => {
        if (icon !== arrow) icon.classList.remove("rotate-180");
      });

      submenu.classList.toggle("hidden", !willOpen);
      if (arrow) arrow.classList.toggle("rotate-180", willOpen);

      localStorage.setItem(`sdpSubmenuOpen:${menuId}`, String(willOpen));
    });
  });

  const toggleButton = document.getElementById("sidebar-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const next = !isSidebarCollapsed();
      localStorage.setItem("sdpSidebarCollapsed", String(next));

      if (next) {
        document.querySelectorAll(".submenu").forEach(item => item.classList.add("hidden"));
      }

      if (typeof onToggle === "function") onToggle(next);
    });
  }

  const lightButton = document.getElementById("theme-light-button");
  const darkButton = document.getElementById("theme-dark-button");

  if (lightButton) {
    lightButton.addEventListener("click", () => {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sdpTheme", "light");
    });
  }

  if (darkButton) {
    darkButton.addEventListener("click", () => {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sdpTheme", "dark");
    });
  }

  const savedTheme = localStorage.getItem("sdpTheme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}
