export const mockDashboardData = {
  generatedAt: "12/05/2026 15:45:00",
  summary: {
    orderToday: 57,
    shopeeToday: 54,
    tiktokToday: 3,
    shippingToday: 32,
    pendingOrders: 25,
    errorBatch: 2,
    totalQtyToday: 81
  },
  orders: [
    {
      platform: "Shopee",
      noPesanan: "2605127HKMX7RA",
      tanggal: "2026-05-12",
      batasKirim: "2026-05-12",
      status: "",
      resi: "SPXID068216710835",
      jasaKirim: "SPX Standard",
      items: [
        {
          produk: "Decant Parfum Velixir Athena Garansi Original",
          variasi: "Asteria Try Me 1 mL",
          kode: "VAS-1",
          qty: 1
        },
        {
          produk: "Decant/Share MYKONOS Monaco Royale",
          variasi: "Try Me 1 mL",
          kode: "MMR-1",
          qty: 1
        },
        {
          produk: "Decant Zimaya Sharaf Divine",
          variasi: "Try Me 1 mL",
          kode: "SFD-1",
          qty: 1
        }
      ]
    },
    {
      platform: "Shopee",
      noPesanan: "2605127HJL83KS",
      tanggal: "2026-05-12",
      batasKirim: "2026-05-13",
      status: "Hold",
      resi: "SPXID068216710999",
      jasaKirim: "SPX Standard",
      items: [
        {
          produk: "Decant Parfum Ahmed Al Maghribi Rawdha",
          variasi: "Try Me 5 mL",
          kode: "RWD-5",
          qty: 2
        }
      ]
    },
    {
      platform: "TikTok",
      noPesanan: "TT2605120091",
      tanggal: "2026-05-12",
      batasKirim: "2026-05-12",
      status: "Kilat",
      resi: "JX123456789",
      jasaKirim: "JNE",
      items: [
        {
          produk: "Decant Parfum Rose Noir",
          variasi: "Try Me 10 mL",
          kode: "RN-10",
          qty: 1
        }
      ]
    }
  ]
};
