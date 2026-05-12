import { renderDashboardPage } from "./pages/dashboard.js";

const pageMeta = {
  dashboard: {
    title: "Dashboard Pesanan",
    subtitle: "Monitoring order harian, shipping, pending, dan batch operasional."
  },
  "shopee-orders": {
    title: "Shopee Orders",
    subtitle: "Halaman laporan dan manajemen pesanan Shopee."
  },
  "tiktok-orders": {
    title: "TikTok Orders",
    subtitle: "Halaman laporan dan manajemen pesanan TikTok."
  },
  "stock-summary": {
    title: "Stock Summary",
    subtitle: "Monitoring stok, demand, dan cover days."
  },
  "batch-status": {
    title: "Batch Status",
    subtitle: "Monitoring batch active, depleted, dan batch error."
  },
  "hpp-per-batch": {
    title: "HPP per Batch",
    subtitle: "Monitoring HPP batch dan cost penjualan."
  },
  "return-order": {
    title: "Return Order",
    subtitle: "Monitoring order return dan realokasi batch."
  }
};

export function renderRoute(page) {
  const title = document.getElementById("page-title");
  const subtitle = document.getElementById("page-subtitle");
  const content = document.getElementById("page-content");

  const meta = pageMeta[page] || pageMeta.dashboard;

  title.textContent = meta.title;
  subtitle.textContent = meta.subtitle;

  if (page === "dashboard") {
    renderDashboardPage(content);
    return;
  }

  content.innerHTML = `
    <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sdp-50 text-sdp-700">
        <i data-lucide="construction" class="h-6 w-6"></i>
      </div>
      <h2 class="text-lg font-extrabold text-slate-900">${meta.title}</h2>
      <p class="mt-1 text-sm text-slate-500">
        Page ini sudah masuk routing. Nanti kita isi layout dan logic-nya setelah dashboard utama selesai.
      </p>
    </div>
  `;
}
