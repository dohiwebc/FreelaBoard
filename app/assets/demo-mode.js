(function () {
  const params = new URLSearchParams(window.location.search);
  const demoParam = params.get("demo");
  const storageKey = "freelaboardDemoMode";

  if (demoParam === "1") {
    sessionStorage.setItem(storageKey, "1");
  }

  if (demoParam === "0") {
    sessionStorage.removeItem(storageKey);
  }

  function isActive() {
    return sessionStorage.getItem(storageKey) === "1";
  }

  function formatDateOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatMonthOffset(monthsAgo, day = 15) {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo, day);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const safeDay = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${safeDay}`;
  }

  const projects = [
    {
      id: "demo-website",
      displayId: "DEMO-001",
      title: "ブランドサイト改修",
      client: "青葉デザイン",
      status: "進行中",
      deadline: formatDateOffset(5),
      publicUrl: "https://example.com/brand-renewal",
      createdAt: formatDateOffset(-20),
      tags: ["Web制作", "急ぎ"],
      items: [
        { name: "トップページ設計", type: "main", price: 180000 },
        { name: "問い合わせ導線改善", type: "option", price: 45000 }
      ],
      totalPrice: 225000
    },
    {
      id: "demo-invoice",
      displayId: "DEMO-002",
      invoiceId: "INV-2026-004",
      title: "請求書テンプレート制作",
      client: "北町スタジオ",
      status: "入金待ち",
      deadline: formatDateOffset(2),
      createdAt: formatDateOffset(-12),
      invoiceIssuedAt: formatDateOffset(-3),
      paymentDueDate: formatDateOffset(11),
      tags: ["請求書", "デザイン"],
      items: [
        { name: "帳票デザイン", type: "main", price: 90000 }
      ],
      totalPrice: 90000
    },
    {
      id: "demo-consulting",
      displayId: "DEMO-003",
      title: "運用相談",
      client: "森川商店",
      status: "相談中",
      deadline: formatDateOffset(12),
      createdAt: formatDateOffset(-2),
      tags: ["相談"],
      items: [
        { name: "初回相談", type: "main", price: 30000 }
      ],
      totalPrice: 30000
    },
    {
      id: "demo-done",
      displayId: "DEMO-004",
      invoiceId: "INV-2026-003",
      title: "LP改善",
      client: "SoraWorks",
      status: "完了",
      deadline: formatDateOffset(-4),
      publicUrl: "https://example.com/lp-improvement",
      createdAt: formatDateOffset(-35),
      invoiceIssuedAt: formatDateOffset(-10),
      paymentDueDate: formatDateOffset(4),
      paidAt: formatDateOffset(-1),
      tags: ["Web制作", "改善"],
      items: [
        { name: "LP実装", type: "main", price: 150000 },
        { name: "分析タグ設定", type: "option", price: 25000 }
      ],
      totalPrice: 175000
    },
    {
      id: "demo-shop-renewal",
      displayId: "DEMO-005",
      invoiceId: "INV-2026-002",
      title: "EC商品ページ改善",
      client: "月島クラフト",
      status: "完了",
      deadline: formatMonthOffset(1, 18),
      publicUrl: "https://example.com/ec-product",
      createdAt: formatMonthOffset(2, 24),
      invoiceIssuedAt: formatMonthOffset(1, 20),
      paymentDueDate: formatMonthOffset(0, 5),
      paidAt: formatMonthOffset(0, 2),
      tags: ["EC", "改善"],
      items: [
        { name: "商品ページUI改善", type: "main", price: 210000 },
        { name: "写真差し替え", type: "option", price: 40000 }
      ],
      totalPrice: 250000
    },
    {
      id: "demo-maintenance",
      displayId: "DEMO-006",
      invoiceId: "INV-2026-001",
      title: "月次保守 3月分",
      client: "青葉デザイン",
      status: "完了",
      deadline: formatMonthOffset(1, 28),
      createdAt: formatMonthOffset(1, 1),
      invoiceIssuedAt: formatMonthOffset(1, 28),
      paymentDueDate: formatMonthOffset(0, 12),
      paidAt: formatMonthOffset(0, 10),
      tags: ["保守", "Web制作"],
      items: [
        { name: "月次保守", type: "main", price: 65000 }
      ],
      totalPrice: 65000
    },
    {
      id: "demo-brand-kit",
      displayId: "DEMO-007",
      invoiceId: "INV-2025-012",
      title: "ブランドキット制作",
      client: "灯台コーヒー",
      status: "完了",
      deadline: formatMonthOffset(2, 20),
      createdAt: formatMonthOffset(3, 12),
      invoiceIssuedAt: formatMonthOffset(2, 21),
      paymentDueDate: formatMonthOffset(1, 7),
      paidAt: formatMonthOffset(1, 5),
      tags: ["デザイン", "ブランディング"],
      items: [
        { name: "ロゴ調整", type: "main", price: 120000 },
        { name: "SNSテンプレート", type: "option", price: 55000 }
      ],
      totalPrice: 175000
    },
    {
      id: "demo-lp-winter",
      displayId: "DEMO-008",
      invoiceId: "INV-2025-011",
      title: "冬キャンペーンLP",
      client: "SoraWorks",
      status: "完了",
      deadline: formatMonthOffset(3, 22),
      createdAt: formatMonthOffset(4, 16),
      invoiceIssuedAt: formatMonthOffset(3, 24),
      paymentDueDate: formatMonthOffset(2, 8),
      paidAt: formatMonthOffset(2, 6),
      tags: ["LP", "Web制作"],
      items: [
        { name: "LPデザイン・実装", type: "main", price: 240000 },
        { name: "A/Bテスト設定", type: "option", price: 35000 }
      ],
      totalPrice: 275000
    },
    {
      id: "demo-photo-direction",
      displayId: "DEMO-009",
      invoiceId: "INV-2025-010",
      title: "商品撮影ディレクション",
      client: "月島クラフト",
      status: "完了",
      deadline: formatMonthOffset(4, 15),
      createdAt: formatMonthOffset(5, 10),
      invoiceIssuedAt: formatMonthOffset(4, 16),
      paymentDueDate: formatMonthOffset(3, 1),
      paidAt: formatMonthOffset(3, 3),
      tags: ["EC", "撮影"],
      items: [
        { name: "撮影ディレクション", type: "main", price: 130000 },
        { name: "レタッチ確認", type: "option", price: 30000 }
      ],
      totalPrice: 160000
    },
    {
      id: "demo-autumn-report",
      displayId: "DEMO-010",
      invoiceId: "INV-2025-009",
      title: "秋期アクセス分析レポート",
      client: "森川商店",
      status: "完了",
      deadline: formatMonthOffset(5, 25),
      createdAt: formatMonthOffset(5, 2),
      invoiceIssuedAt: formatMonthOffset(5, 26),
      paymentDueDate: formatMonthOffset(4, 10),
      paidAt: formatMonthOffset(4, 9),
      tags: ["分析", "相談"],
      items: [
        { name: "アクセス分析", type: "main", price: 85000 },
        { name: "改善提案書", type: "option", price: 45000 }
      ],
      totalPrice: 130000
    },
    {
      id: "demo-reservation-ui",
      displayId: "DEMO-011",
      invoiceId: "INV-2025-008",
      title: "予約フォームUI改善",
      client: "北町スタジオ",
      status: "完了",
      deadline: formatMonthOffset(6, 17),
      createdAt: formatMonthOffset(7, 20),
      invoiceIssuedAt: formatMonthOffset(6, 18),
      paymentDueDate: formatMonthOffset(5, 2),
      paidAt: formatMonthOffset(5, 1),
      tags: ["改善", "UI"],
      items: [
        { name: "フォームUI改善", type: "main", price: 155000 }
      ],
      totalPrice: 155000
    },
    {
      id: "demo-summer-banner",
      displayId: "DEMO-012",
      invoiceId: "INV-2025-007",
      title: "夏セールバナー制作",
      client: "灯台コーヒー",
      status: "完了",
      deadline: formatMonthOffset(7, 8),
      createdAt: formatMonthOffset(7, 1),
      invoiceIssuedAt: formatMonthOffset(7, 9),
      paymentDueDate: formatMonthOffset(6, 23),
      paidAt: formatMonthOffset(6, 22),
      tags: ["デザイン", "バナー"],
      items: [
        { name: "バナー6点", type: "main", price: 78000 },
        { name: "リサイズ追加", type: "option", price: 18000 }
      ],
      totalPrice: 96000
    },
    {
      id: "demo-newsletter",
      displayId: "DEMO-013",
      invoiceId: "INV-2025-006",
      title: "ニュースレター改善",
      client: "青葉デザイン",
      status: "完了",
      deadline: formatMonthOffset(8, 19),
      createdAt: formatMonthOffset(8, 4),
      invoiceIssuedAt: formatMonthOffset(8, 20),
      paymentDueDate: formatMonthOffset(7, 4),
      paidAt: formatMonthOffset(7, 6),
      tags: ["改善", "ライティング"],
      items: [
        { name: "構成改善", type: "main", price: 70000 },
        { name: "件名案作成", type: "option", price: 15000 }
      ],
      totalPrice: 85000
    },
    {
      id: "demo-spring-site",
      displayId: "DEMO-014",
      invoiceId: "INV-2025-005",
      title: "春の採用サイト更新",
      client: "SoraWorks",
      status: "完了",
      deadline: formatMonthOffset(9, 27),
      createdAt: formatMonthOffset(10, 15),
      invoiceIssuedAt: formatMonthOffset(9, 28),
      paymentDueDate: formatMonthOffset(8, 12),
      paidAt: formatMonthOffset(8, 11),
      tags: ["Web制作", "採用"],
      items: [
        { name: "採用ページ更新", type: "main", price: 190000 },
        { name: "社員インタビュー整形", type: "option", price: 42000 }
      ],
      totalPrice: 232000
    },
    {
      id: "demo-old-overdue",
      displayId: "DEMO-015",
      invoiceId: "INV-2025-004",
      title: "旧サイト軽微修正",
      client: "森川商店",
      status: "入金待ち",
      deadline: formatMonthOffset(10, 12),
      createdAt: formatMonthOffset(10, 1),
      invoiceIssuedAt: formatMonthOffset(10, 13),
      paymentDueDate: formatMonthOffset(9, 27),
      tags: ["保守", "改善"],
      items: [
        { name: "軽微修正", type: "main", price: 48000 }
      ],
      totalPrice: 48000
    },
    {
      id: "demo-year-start",
      displayId: "DEMO-016",
      invoiceId: "INV-2025-003",
      title: "年間運用計画作成",
      client: "北町スタジオ",
      status: "完了",
      deadline: formatMonthOffset(11, 20),
      createdAt: formatMonthOffset(11, 3),
      invoiceIssuedAt: formatMonthOffset(11, 21),
      paymentDueDate: formatMonthOffset(10, 5),
      paidAt: formatMonthOffset(10, 4),
      tags: ["相談", "運用"],
      items: [
        { name: "運用計画作成", type: "main", price: 115000 },
        { name: "KPIシート", type: "option", price: 22000 }
      ],
      totalPrice: 137000
    }
  ];

  const tags = ["Web制作", "急ぎ", "請求書", "デザイン", "相談", "改善", "EC", "保守", "ブランディング", "LP", "撮影", "分析", "UI", "バナー", "ライティング", "採用", "運用"].map((name, index) => ({
    id: `demo-tag-${index + 1}`,
    name,
    createdAt: formatDateOffset(-30 + index)
  }));

  const profile = {
    userId: "demo",
    email: "demo@example.com",
    createdAt: formatDateOffset(-45),
    taxRate: 10,
    companyName: "FreelaBoard Demo Office",
    tradeName: "Freela Studio",
    address: "東京都渋谷区デモ1-2-3",
    phone: "090-0000-0000",
    invoiceNameType: "tradeName",
    invoiceNumberPrefix: "INV",
    registrationNumber: "T1234567890123",
    businessName: "FreelaBoard Demo",
    paymentDueDays: 14,
    bankName: "デモ銀行",
    bankBranch: "渋谷支店",
    bankAccountType: "普通",
    bankAccountNumber: "1234567",
    bankAccountName: "フリーラ デモ",
    invoiceNote: "お振込み手数料はご負担ください。"
  };

  function getProjects() {
    return projects.map((project) => ({
      ...project,
      items: Array.isArray(project.items) ? project.items.map((item) => ({ ...item })) : [],
      tags: Array.isArray(project.tags) ? [...project.tags] : []
    }));
  }

  function getTags() {
    return tags.map((tag) => ({ ...tag }));
  }

  function getProfile() {
    return { ...profile };
  }

  function withDemoUrl(url) {
    if (!isActive()) return url;

    const parsedUrl = new URL(url, window.location.href);
    const isLocalPage = parsedUrl.protocol === "file:" || parsedUrl.origin === window.location.origin;

    if (!isLocalPage || !parsedUrl.pathname.endsWith(".html")) {
      return url;
    }

    parsedUrl.searchParams.set("demo", "1");
    return parsedUrl.href;
  }

  function preserveDemoLinks() {
    if (!isActive()) return;

    document.querySelectorAll('a[href$=".html"], a[href*=".html?"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      if (link.classList.contains("logout")) {
        link.href = withDemoUrl("./login.html").replace("demo=1", "demo=0");
        link.addEventListener("click", exit);
        return;
      }

      link.href = withDemoUrl(href);
    });
  }

  function renderPageNotice(pageName, customMessage = "") {
    const accountName = document.getElementById("topAccountName");
    const loading = document.getElementById("loading");
    const content = document.querySelector(".content") || document.querySelector("main");
    const note = document.createElement("p");
    const dashboardLink = document.createElement("a");

    if (accountName) {
      accountName.textContent = "demo";
    }

    if (loading) {
      loading.style.display = "none";
    }

    document.querySelectorAll("td.message, p.message").forEach((message) => {
      if (message.textContent.includes("読み込み")) {
        message.textContent = "デモ中は実データを読み込みません";
      }
    });

    if (!content || content.querySelector(".fb-demo-note")) {
      return;
    }

    note.className = "fb-demo-note";
    note.append(customMessage || `${pageName || "このページ"}はデモ中の実データ取得を停止しています。`);
    dashboardLink.href = withDemoUrl("./dashboard.html");
    dashboardLink.textContent = "サンプルダッシュボードへ戻る";
    note.appendChild(dashboardLink);
    content.prepend(note);
  }

  function exit() {
    sessionStorage.removeItem(storageKey);
  }

  window.FreelaBoardDemo = {
    exit,
    getProfile,
    getProjects,
    getTags,
    isActive,
    preserveDemoLinks,
    renderPageNotice,
    withDemoUrl
  };

  document.addEventListener("DOMContentLoaded", preserveDemoLinks);
})();
