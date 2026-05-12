import { mockDashboardData } from "../mock-data.js";
import { num, rupiah, dateText, safe, escapeHtml } from "../utils.js";

function getStatusConfig(status, batasKirim) {
  const raw = String(status || "").trim();
  const lower = raw.toLowerCase();

  if (lower === "shipping") {
    return {
      label: "Shipping",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200"
    };
  }

  if (lower === "hold") {
    return {
      label: "Hold",
      className: "bg-amber-50 text-amber-700 border-amber-200"
    };
  }

  if (lower === "outstock") {
    return {
      label: "Outstock",
      className: "bg-rose-50 text-rose-700 border-rose-200"
    };
  }

  if (lower === "kilat") {
    return {
      label: "Kilat",
      className: "bg-blue-50 text-blue-700 border-blue-200"
    };
  }

  if (lower === "cancel") {
    return {
      label: "Cancel",
      className: "bg-red-600 text-white border-red-600"
    };
  }

  const diff = getDiffDaysFromToday(batasKirim);

  if (diff === null) {
    return {
      label: "-",
      className: "bg-slate-50 text-slate-600 border-slate-200"
    };
  }

  if (diff < 0) {
    return {
      label: "Terlambat",
      className: "bg-yellow-50 text-yellow-700 border-yellow-200"
    };
  }

  if (diff === 0) {
    return {
      label: "Perlu Dikirim",
      className: "bg-sdp-50 text-sdp-700 border-sdp-100"
    };
  }

  if (diff === 1) {
    return {
      label: "Pengiriman Besok",
      className: "bg-blue-50 text-blue-700 border-blue-200"
    };
  }

  return {
    label: "Jadwal Mendatang",
    className: "bg-slate-50 text-slate-600 border-slate-200"
  };
}

function getDiffDaysFromToday(value) {
  if (!value) return null;

  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return null;

  const now = new Date();

  const todayOnly = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const targetOnly = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  return Math.round((targetOnly.getTime() - todayOnly.getTime()) / 86400000);
}

function renderStatusBadge(status, batasKirim) {
  const config = getStatusConfig(status, batasKirim);

  return `
    <span class="inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold leading-none ${config.className}">
      ${escapeHtml(config.label)}
    </span>
  `;
}

function renderMetricCard({
  id,
  title,
  value,
  subtitle,
  icon,
  color = "sdp",
  primary = false
}) {
  const colors = {
    sdp: {
      icon: "bg-sdp-50 text-sdp-700",
      bar: "bg-sdp-500"
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500"
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      bar: "bg-amber-500"
    },
    rose: {
      icon: "bg-rose-50 text-rose-600",
      bar: "bg-rose-500"
    },
    blue: {
      icon: "bg-blue-50 text-blue-600",
      bar: "bg-blue-500"
    },
    purple: {
      icon: "bg-purple-50 text-purple-600",
      bar: "bg-purple-500"
    }
  };

  const c = colors[color] || colors.sdp;

  if (primary) {
    return `
      <button
        type="button"
        data-metric="${id}"
        class="dashboard-metric group relative overflow-hidden rounded-2xl bg-sdp-700 p-5 text-left shadow-lg shadow-sdp-700/20 transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="absolute -right-5 -bottom-7 text-white/10 transition-transform duration-500 group-hover:scale-110">
          <i data-lucide="${icon}" class="h-24 w-24"></i>
        </div>

        <div class="relative z-10">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-sdp-100">
              ${escapeHtml(title)}
            </span>
            <i data-lucide="${icon}" class="h-4 w-4 text-sdp-100"></i>
          </div>

          <div class="text-3xl font-extrabold tracking-tight text-white">
            ${escapeHtml(value)}
          </div>

          <p class="mt-1 text-[11px] font-semibold text-sdp-100">
            ${escapeHtml(subtitle)}
          </p>
        </div>
      </button>
    `;
  }

  return `
    <button
      type="button"
      data-metric="${id}"
      class="dashboard-metric rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-sdp-100 hover:shadow-md"
    >
      <div class="mb-3 flex items-start justify-between">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl ${c.icon}">
          <i data-lucide="${icon}" class="h-5 w-5"></i>
        </div>

        <span class="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-extrabold text-slate-400">
          ${escapeHtml(subtitle)}
        </span>
      </div>

      <div class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
        ${escapeHtml(title)}
      </div>

      <div class="mt-1 text-2xl font-extrabold tracking-tight text-slate-800">
        ${escapeHtml(value)}
      </div>

      <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div class="h-full w-full rounded-full ${c.bar} opacity-60"></div>
      </div>
    </button>
  `;
}

function renderOrderCard(order) {
  const items = order.items || [];

  return `
    <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div class="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4">
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sdp-50 text-sdp-700">
            <i data-lucide="${String(order.platform).toLowerCase() === "tiktok" ? "music-2" : "shopping-bag"}" class="h-5 w-5"></i>
          </div>

          <div class="min-w-0">
            <div class="text-sm font-extrabold text-slate-800">
              ${escapeHtml(safe(order.platform))}
            </div>
            <div class="text-xs font-medium text-slate-500">
              Tanggal Order: ${escapeHtml(dateText(order.tanggal))}
            </div>
          </div>
        </div>

        <div class="text-right">
          <div class="text-xs font-bold text-slate-400">No. Pesanan</div>
          <div class="text-sm font-extrabold text-sdp-700">
            ${escapeHtml(safe(order.noPesanan))}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4 px-5 pt-4 text-xs font-extrabold text-slate-400">
        <div class="col-span-6">Produk</div>
        <div class="col-span-2 text-center">Status</div>
        <div class="col-span-3">Jasa Kirim</div>
        <div class="col-span-1 text-right">Aksi</div>
      </div>

      <div class="grid grid-cols-12 gap-4 px-5 pb-4">
        <div class="col-span-6 divide-y divide-slate-100">
          ${items.map((item, index) => `
            <div class="py-3">
              <div class="text-sm font-extrabold leading-snug text-slate-800">
                <span class="mr-1 text-sdp-700">${index + 1}.</span>
                ${escapeHtml(safe(item.produk))}
              </div>
              <div class="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                Kode: <b>${escapeHtml(safe(item.kode))}</b>
                · Variasi: ${escapeHtml(safe(item.variasi))}
                · Qty: ${escapeHtml(safe(item.qty))}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="col-span-2 pt-3 text-center">
          ${renderStatusBadge(order.status, order.batasKirim)}
        </div>

        <div class="col-span-3 pt-3">
          <div class="text-sm font-bold text-slate-800">${escapeHtml(safe(order.jasaKirim))}</div>
          <div class="mt-1 break-words text-xs font-medium text-slate-500">${escapeHtml(safe(order.resi))}</div>
        </div>

        <div class="col-span-1 pt-3 text-right">
          <button
            type="button"
            data-order-detail="${escapeHtml(order.noPesanan)}"
            class="text-xs font-extrabold text-sdp-700 hover:underline"
          >
            Detail
          </button>
        </div>
      </div>

      <div class="flex flex-wrap justify-end gap-4 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs font-medium text-slate-500">
        <span>Total Item: <b class="text-slate-700">${num(items.length)}</b></span>
        <span>Batas Kirim: <b class="text-slate-700">${escapeHtml(dateText(order.batasKirim))}</b></span>
        <span>Resi: <b class="text-slate-700">${escapeHtml(safe(order.resi))}</b></span>
      </div>
    </article>
  `;
}

function renderOrderList(orders) {
  if (!orders.length) {
    return `
      <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <i data-lucide="inbox" class="h-6 w-6"></i>
        </div>
        <div class="text-sm font-extrabold text-slate-700">Tidak ada order</div>
        <div class="mt-1 text-xs text-slate-500">Coba ubah filter atau search keyword.</div>
      </div>
    `;
  }

  return `
    <div class="space-y-4">
      ${orders.map(renderOrderCard).join("")}
    </div>
  `;
}

function renderOrderDetailModal(order) {
  if (!order) return "";

  return `
    <div id="order-detail-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/40 p-5">
      <div class="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <div class="text-lg font-extrabold text-slate-900">Detail Pesanan</div>
            <div class="mt-1 text-sm text-slate-500">
              No Pesanan: <b>${escapeHtml(order.noPesanan)}</b>
              · Platform: <b>${escapeHtml(order.platform)}</b>
              · Resi: <b>${escapeHtml(order.resi)}</b>
            </div>
          </div>

          <button
            type="button"
            id="close-order-modal"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <i data-lucide="x" class="h-5 w-5"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs font-bold text-slate-400">Jumlah Variasi</div>
            <div class="mt-1 text-xl font-extrabold text-slate-900">${num(order.items.length)}</div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs font-bold text-slate-400">Tanggal Order</div>
            <div class="mt-1 text-xl font-extrabold text-slate-900">${escapeHtml(dateText(order.tanggal))}</div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs font-bold text-slate-400">Batas Kirim</div>
            <div class="mt-1 text-xl font-extrabold text-slate-900">${escapeHtml(dateText(order.batasKirim))}</div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="text-xs font-bold text-slate-400">Status</div>
            <div class="mt-2">${renderStatusBadge(order.status, order.batasKirim)}</div>
          </div>
        </div>

        <div class="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th class="px-4 py-3">Produk</th>
                <th class="px-4 py-3">Kode</th>
                <th class="px-4 py-3">Variasi</th>
                <th class="px-4 py-3">Qty</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${order.items.map(item => `
                <tr>
                  <td class="px-4 py-3 font-bold text-slate-800">${escapeHtml(item.produk)}</td>
                  <td class="px-4 py-3">${escapeHtml(item.kode)}</td>
                  <td class="px-4 py-3">${escapeHtml(item.variasi)}</td>
                  <td class="px-4 py-3">${escapeHtml(item.qty)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function filterOrders(orders) {
  const search = document.getElementById("dashboard-search")?.value?.trim().toLowerCase() || "";
  const platform = document.getElementById("dashboard-platform-filter")?.value || "all";
  const status = document.getElementById("dashboard-status-filter")?.value || "all";

  return orders.filter(order => {
    const haystack = [
      order.platform,
      order.noPesanan,
      order.resi,
      order.jasaKirim,
      order.status,
      order.items?.map(item => `${item.produk} ${item.variasi} ${item.kode}`).join(" ")
    ].join(" ").toLowerCase();

    const matchSearch = !search || haystack.includes(search);
    const matchPlatform = platform === "all" || String(order.platform).toLowerCase() === platform;

    const statusText = getStatusConfig(order.status, order.batasKirim).label.toLowerCase();
    const matchStatus = status === "all" || statusText.includes(status);

    return matchSearch && matchPlatform && matchStatus;
  });
}

function bindDashboardEvents(data, container) {
  const rerenderOrders = () => {
    const listTarget = container.querySelector("#dashboard-order-list");
    const filtered = filterOrders(data.orders || []);
    listTarget.innerHTML = renderOrderList(filtered);

    const count = container.querySelector("#dashboard-order-count");
    if (count) {
      count.textContent = `Tampil: ${num(filtered.length)} dari ${num((data.orders || []).length)} order`;
    }

    bindOrderDetailButtons(data, container);
    refreshLucide();
  };

  ["dashboard-search", "dashboard-platform-filter", "dashboard-status-filter"].forEach(id => {
    const el = container.querySelector(`#${id}`);
    if (el) el.addEventListener("input", rerenderOrders);
    if (el) el.addEventListener("change", rerenderOrders);
  });

  bindOrderDetailButtons(data, container);
}

function bindOrderDetailButtons(data, container) {
  container.querySelectorAll("[data-order-detail]").forEach(button => {
    button.addEventListener("click", () => {
      const noPesanan = button.dataset.orderDetail;
      const order = (data.orders || []).find(item => item.noPesanan === noPesanan);

      const modalWrap = container.querySelector("#dashboard-modal-wrap");
      modalWrap.innerHTML = renderOrderDetailModal(order);

      const modal = container.querySelector("#order-detail-modal");
      const close = container.querySelector("#close-order-modal");

      if (modal) modal.classList.remove("hidden");
      if (modal) modal.classList.add("flex");

      if (close) {
        close.addEventListener("click", () => {
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        });
      }

      if (modal) {
        modal.addEventListener("click", event => {
          if (event.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          }
        });
      }

      refreshLucide();
    });
  });
}

function refreshLucide() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

export function renderDashboardPage(container) {
  const data = mockDashboardData;
  const s = data.summary;

  container.innerHTML = `
    <div class="space-y-6">
      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="mb-1 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sdp-50 text-sdp-700">
                <i data-lucide="layout-dashboard" class="h-5 w-5"></i>
              </div>

              <div>
                <h2 class="text-lg font-extrabold tracking-tight text-slate-800">
                  Operational Dashboard
                </h2>
                <p class="text-xs font-medium text-slate-500">
                  Dashboard harian berdasarkan BEMLPERDAY dan Scan Paket.
                </p>
              </div>
            </div>
          </div>

          <div class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">
            <i data-lucide="clock" class="h-4 w-4"></i>
            Last update: ${escapeHtml(data.generatedAt)}
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        ${renderMetricCard({
          id: "order",
          title: "Total Order",
          value: num(s.orderToday),
          subtitle: "Pesanan hari ini",
          icon: "shopping-bag",
          primary: true
        })}

        ${renderMetricCard({
          id: "shipping",
          title: "Shipping",
          value: num(s.shippingToday),
          subtitle: "Scan hari ini",
          icon: "package-check",
          color: "green"
        })}

        ${renderMetricCard({
          id: "pending",
          title: "Pending Orders",
          value: num(s.pendingOrders),
          subtitle: "Perlu diproses",
          icon: "clock-3",
          color: "amber"
        })}

        ${renderMetricCard({
          id: "error",
          title: "Error Batch",
          value: num(s.errorBatch),
          subtitle: "Butuh cek",
          icon: "triangle-alert",
          color: "rose"
        })}

        ${renderMetricCard({
          id: "shopee",
          title: "Shopee",
          value: num(s.shopeeToday),
          subtitle: "Marketplace",
          icon: "store",
          color: "blue"
        })}

        ${renderMetricCard({
          id: "tiktok",
          title: "TikTok",
          value: num(s.tiktokToday),
          subtitle: "Marketplace",
          icon: "music-2",
          color: "purple"
        })}

        ${renderMetricCard({
          id: "qty",
          title: "Total Qty",
          value: num(s.totalQtyToday),
          subtitle: "Unit order",
          icon: "boxes",
          color: "sdp"
        })}

        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-3 flex items-start justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <i data-lucide="banknote" class="h-5 w-5"></i>
            </div>
            <span class="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-extrabold text-slate-400">Cost</span>
          </div>

          <div class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Estimasi HPP</div>
          <div class="mt-1 truncate text-xl font-extrabold tracking-tight text-slate-800">${rupiah(0)}</div>

          <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div class="h-full w-full rounded-full bg-emerald-500 opacity-60"></div>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div class="text-sm font-extrabold text-slate-900">Order List</div>
            <div id="dashboard-order-count" class="mt-1 text-xs font-bold text-slate-500">
              Total data: ${num(data.orders.length)} order
            </div>
          </div>

          <div class="flex flex-col gap-3 md:flex-row md:items-center">
            <div class="relative">
              <i data-lucide="search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"></i>
              <input
                id="dashboard-search"
                type="text"
                placeholder="Cari no pesanan, produk, resi..."
                class="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-sdp-500 focus:ring-4 focus:ring-sdp-500/10 md:w-80"
              />
            </div>

            <select
              id="dashboard-platform-filter"
              class="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 outline-none focus:border-sdp-500 focus:ring-4 focus:ring-sdp-500/10"
            >
              <option value="all">Semua Platform</option>
              <option value="shopee">Shopee</option>
              <option value="tiktok">TikTok</option>
            </select>

            <select
              id="dashboard-status-filter"
              class="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 outline-none focus:border-sdp-500 focus:ring-4 focus:ring-sdp-500/10"
            >
              <option value="all">Semua Status</option>
              <option value="perlu dikirim">Perlu Dikirim</option>
              <option value="shipping">Shipping</option>
              <option value="hold">Hold</option>
              <option value="terlambat">Terlambat</option>
              <option value="kilat">Kilat</option>
            </select>
          </div>
        </div>

        <div id="dashboard-order-list">
          ${renderOrderList(data.orders)}
        </div>
      </section>

      <div id="dashboard-modal-wrap"></div>
    </div>
  `;

  bindDashboardEvents(data, container);
  refreshLucide();
}
