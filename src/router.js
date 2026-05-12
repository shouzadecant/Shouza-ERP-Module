import { renderDashboardPage } from "./pages/dashboard.js";

const pageMeta = {
  dashboard: {
    title: "Dashboard Pesanan",
    subtitle: "Monitoring order harian, shipping, pending, dan batch operasional."
  },
  summary: {
    title: "Business Summary",
    subtitle: "Ringkasan performa bisnis, revenue, profit, dan channel."
  },
  "shopee-orders": {
    title: "Shopee Orders",
    subtitle: "Halaman laporan dan manajemen pesanan Shopee."
  },
  "sellercenter-orders": {
    title: "SellerCenter Orders",
    subtitle: "Halaman laporan dan manajemen pesanan SellerCenter."
  },
  "tiktok-orders": {
    title: "TikTok Orders",
    subtitle: "Halaman laporan dan manajemen pesanan TikTok."
  },
  "return-order": {
    title: "Return Orders",
    subtitle: "Monitoring order return dan realokasi batch."
  },
  "ads-shopee": {
    title: "Shopee Ads",
    subtitle: "Monitoring performa iklan Shopee."
  },
  "ads-sellercenter": {
    title: "SellerCenter Ads",
    subtitle: "Monitoring performa iklan SellerCenter."
  },
  "saldo-shopee": {
    title: "Saldo Shopee",
    subtitle: "Monitoring saldo, withdrawal, dan biaya Shopee."
  },
  "saldo-sellercenter": {
    title: "Saldo SellerCenter",
    subtitle: "Monitoring saldo dan withdrawal SellerCenter."
  },
  "hpp-per-batch": {
    title: "HPP per Batch",
    subtitle: "Monitoring HPP batch dan cost penjualan."
  },
  bemlperday: {
    title: "BEMLPERDAY",
    subtitle: "Data order harian, variasi, qty, status, dan batch number."
  },
  "stock-summary": {
    title: "Stock Summary",
    subtitle: "Monitoring stok, demand, dan cover days."
  },
  "batch-status": {
    title: "Batch Status",
    subtitle: "Monitoring batch active, depleted, dan batch error."
  },
  "scan-paket": {
    title: "Scan Paket",
    subtitle: "Monitoring scan resi/no pesanan untuk shipping."
  },
  "return-stock": {
    title: "Return Stock",
    subtitle: "Monitoring return stock dan alokasi ulang batch."
  },
  users: {
    title: "Manage Users",
    subtitle: "Kelola user, role, dan akses dashboard."
  },
  products: {
    title: "Manage Products",
    subtitle: "Kelola master produk dan SKU."
  },
  "activity-log": {
    title: "Activity Logs",
    subtitle: "Riwayat aktivitas sistem."
  },
  profile: {
    title: "Profile",
    subtitle: "Pengaturan profil dan preferensi aplikasi."
  }
};

export function renderRoute(page) {
  const title = document.getElementById("page-title");
  const subtitle = document.getElementById("page-subtitle");
  const content = document.getElementById("page-content");

  const meta = pageMeta[page] || pageMeta.dashboard;

  if (title) title.textContent = meta.title;
  if (subtitle) subtitle.textContent = meta.subtitle;
  if (!content) return;

  if (page === "dashboard") {
    renderDashboardPage(content);
    return;
  }

  content.innerHTML = `
    <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
        <i data-lucide="construction" class="h-6 w-6"></i>
      </div>

      <h2 class="text-lg font-extrabold text-slate-900 dark:text-white">
        ${meta.title}
      </h2>

      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Page ini sudah masuk routing. Nanti kita isi layout dan logic-nya setelah dashboard utama selesai.
      </p>
    </div>
  `;
}
