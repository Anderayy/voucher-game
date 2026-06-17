const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let products = [
  {
    id: "mlbb",
    name: "Mobile Legends",
    fullName: "Mobile Legends: Bang Bang",
    category: "mobile",
    genre: "ONLINE",
    image: "assets/products/mlbb.webp",
    flashIcon: "ML",
    flashName: "Weekly Diamond Pass",
    publisher: "Mobile Legends",
    discount: "-15%",
    oldPrice: 30000,
    price: 25500,
    desc: "Top Up Diamonds Mobile Legends instan, murah, dan terpercaya. Proses hanya hitungan detik.",
    items: [["5 Diamonds", 1500], ["12 Diamonds", 3500], ["50 Diamonds", 14200], ["100 Diamonds", 28500], ["250 Diamonds", 71000], ["500 Diamonds", 142500], ["1000 Diamonds", 285000], ["Weekly Diamond Pass", 30000], ["Starlight Member", 150000]]
  },
  {
    id: "garena",
    name: "Voucher Garena",
    fullName: "Voucher Garena Shell",
    category: "mobile",
    genre: "VOUCHER",
    image: "assets/products/garena-shell.svg",
    flashIcon: "GS",
    flashName: "Voucher Garena 165 Shell",
    publisher: "Garena Shell",
    discount: "-10%",
    oldPrice: 50000,
    price: 45000,
    desc: "Voucher Garena Shell untuk redeem saldo Garena dan game Garena favorit.",
    items: [["33 Shell", 10000], ["66 Shell", 20000], ["165 Shell", 45000], ["330 Shell", 90000], ["660 Shell", 180000], ["990 Shell", 270000]]
  },
  {
    id: "hok",
    name: "Honor of Kings",
    fullName: "Honor of Kings",
    category: "mobile",
    genre: "MOBA",
    image: "assets/products/hok.webp",
    flashIcon: "HK",
    flashName: "240 Tokens",
    publisher: "Honor of Kings",
    discount: "-12%",
    oldPrice: 51000,
    price: 45000,
    desc: "Top up token Honor of Kings instan dan aman.",
    items: [["80 Tokens", 15000], ["240 Tokens", 45000], ["400 Tokens", 72000], ["800 Tokens", 139000]]
  },
  {
    id: "roblox",
    name: "Roblox",
    fullName: "Roblox",
    category: "pc",
    genre: "CREATIVE",
    image: "assets/products/roblox.webp",
    flashIcon: "RB",
    flashName: "800 Robux",
    publisher: "Roblox",
    discount: "-20%",
    oldPrice: 150000,
    price: 120000,
    desc: "Voucher Robux digital untuk akun Roblox Indonesia.",
    items: [["80 Robux", 18000], ["160 Robux", 35000], ["400 Robux", 85000], ["800 Robux", 120000]]
  },
  {
    id: "freefire",
    name: "Free Fire",
    fullName: "Free Fire",
    category: "mobile",
    genre: "BATTLE ROYALE",
    image: "assets/products/freefire.webp",
    flashIcon: "FF",
    flashName: "70 Diamonds",
    publisher: "Free Fire",
    discount: "-5%",
    oldPrice: 10000,
    price: 9500,
    desc: "Top up diamond Free Fire cepat untuk akun region Indonesia.",
    items: [["70 Diamonds", 9500], ["140 Diamonds", 19000], ["355 Diamonds", 47000], ["720 Diamonds", 95000]]
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    fullName: "PUBG Mobile",
    category: "mobile",
    genre: "SHOOTER",
    image: "assets/products/pubgmobile.png",
    flashIcon: "PB",
    flashName: "660 UC",
    publisher: "PUBG Mobile",
    discount: "-8%",
    oldPrice: 165000,
    price: 150000,
    desc: "Top up UC PUBG Mobile dengan pembayaran otomatis.",
    items: [["60 UC", 15000], ["325 UC", 75000], ["660 UC", 150000], ["1800 UC", 300000]]
  },
  {
    id: "valorant",
    name: "Valorant",
    fullName: "Valorant Points",
    category: "pc",
    genre: "TACTICAL",
    image: "assets/products/valorant-logo.svg",
    flashIcon: "VL",
    flashName: "1125 Points",
    publisher: "Valorant",
    discount: "-7%",
    oldPrice: 129000,
    price: 120000,
    desc: "Voucher Valorant Points untuk upgrade skin dan battle pass.",
    items: [["475 Points", 55000], ["1000 Points", 110000], ["1125 Points", 120000], ["2050 Points", 220000]]
  },
  {
    id: "steam",
    name: "Steam Wallet",
    fullName: "Steam Wallet",
    category: "pc",
    genre: "WALLET",
    image: "assets/products/steam-gift-card.png",
    flashIcon: "SW",
    flashName: "Steam Wallet $10",
    publisher: "Steam",
    discount: "-6%",
    oldPrice: 175000,
    price: 165000,
    desc: "Voucher Steam Wallet digital siap redeem.",
    items: [["Steam 45K", 45000], ["Steam 90K", 90000], ["Steam $10", 165000], ["Steam $20", 325000]]
  }
];

const heroSlides = [
  { title: "Nikmati Bonus Topup<br>hingga 50%", badge: "PROMO TERBATAS", image: "assets/hero-esports.png" },
  { title: "Flash Sale Diamond<br>mulai Rp 9.500", badge: "FLASH SALE", image: "assets/hero-gaming.png" },
  { title: "Voucher Game Aman<br>proses instan", badge: "TRUSTED STORE", image: "assets/hero-esports.png" }
];

let activeProduct = products[0];
let activeItem = activeProduct.items[2];
let selectedPayment = "QRIS";
let discountRate = 0;
let userName = "Rizky Perdana";
let heroIndex = 0;
let countdownSeconds = 9907;
let editingProductId = null;

const transactions = [
  ["TX-90214", "Mobile Legends Diamonds", "GOPAY", 150000, "SUCCESS"],
  ["TX-90215", "Genshin Impact Crystals", "QRIS", 799000, "PENDING"],
  ["TX-90216", "Free Fire Diamonds", "OVO", 45000, "SUCCESS"],
  ["TX-90217", "Valorant Points", "DANA", 210000, "SUCCESS"],
  ["TX-90218", "PUBG Mobile UC", "Bank Transfer", 300000, "PENDING"],
  ["INV-2841-ML", "Mobile Legends 257 Diamonds", "QRIS", 84500, "SUCCESS"],
  ["INV-9210-GS", "Genshin Blessing of Moon", "DANA", 79000, "PENDING"]
];

const leaderboard = [
  ["Rizky Perdana", 1240, "Silver Gamer"],
  ["Nadia Queen", 1190, "Gold Gamer"],
  ["Rangga Pro", 980, "Elite"],
  ["Aldi MLBB", 820, "Silver Gamer"],
  ["Raka FF", 760, "Bronze"],
  ["Sasa Genshin", 690, "Bronze"]
];

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2400);
}

function totalPrice() {
  return Math.max(0, Math.round(activeItem[1] * (1 - discountRate)));
}

function renderFlashSale() {
  $("#flashGrid").innerHTML = products.slice(0, 4).map((product) => `
    <article class="flash-card">
      <span class="discount">${product.discount}</span>
      <div class="flash-art"><img src="${product.image}" alt="${product.publisher}"></div>
      <h3>${product.flashName}</h3>
      <p>${product.publisher}</p>
      <div class="price-row">
        <div>
          <del>${idr.format(product.oldPrice)}</del>
          <strong>${idr.format(product.price)}</strong>
        </div>
        <button data-open-product="${product.id}">Beli</button>
      </div>
    </article>
  `).join("");
}

function renderPopular(filter = "all") {
  const list = filter === "all" ? products.slice(0, 6) : products.filter((product) => product.category === filter);
  $("#popularGrid").innerHTML = list.map((product) => `
    <article class="game-card" data-open-product="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <span class="genre">${product.genre}</span>
      <h3>${product.name}</h3>
    </article>
  `).join("");
  bindProductButtons();
}

function renderNominals() {
  $("#nominalGrid").innerHTML = activeProduct.items.map((item, index) => `
    <button class="nominal-card ${item === activeItem ? "active" : ""}" data-item-index="${index}">
      <span>DIAMOND</span>
      <strong>${item[0]}</strong>
      <small>${idr.format(item[1])}</small>
    </button>
  `).join("");

  $$("[data-item-index]").forEach((button) => {
    button.addEventListener("click", () => {
      activeItem = activeProduct.items[Number(button.dataset.itemIndex)];
      renderNominals();
      updateSummary();
      toast(`${activeItem[0]} dipilih`);
    });
  });
}

function updateSummary() {
  const formatted = idr.format(totalPrice());
  $("#summaryProduct").textContent = activeProduct.fullName;
  $("#summaryItem").textContent = activeItem[0];
  $("#summaryPayment").textContent = selectedPayment;
  $("#summaryPrice").textContent = formatted;
  $("#payPrice").textContent = formatted;
  $("#danaPrice").textContent = formatted;
  $("#bcaPrice").textContent = formatted;
  $("#discountNote").textContent = discountRate ? `Diskon ${Math.round(discountRate * 100)}% aktif` : "Termasuk PPN & Biaya Admin";
}

function bindProductButtons() {
  $$("[data-open-product]").forEach((button) => {
    button.addEventListener("click", () => openProduct(button.dataset.openProduct));
  });
}

function openProduct(id) {
  activeProduct = products.find((product) => product.id === id) || products[0];
  activeItem = activeProduct.items[0];
  discountRate = 0;
  $("#detailCover").src = activeProduct.image;
  $("#detailCover").alt = activeProduct.fullName;
  $("#detailTitle").textContent = activeProduct.fullName;
  $("#detailDesc").textContent = activeProduct.desc;
  renderNominals();
  updateSummary();
  showScreen("detail");
}

function showScreen(name) {
  const target = $(`#${name}Screen`);
  if (!target) return;
  $$(".screen").forEach((screen) => screen.classList.remove("active"));
  target.classList.add("active");
  document.body.classList.toggle("auth-mode", name === "auth");
  document.body.classList.toggle("admin-mode", name === "admin");
  document.body.classList.toggle("user-mode", name === "user");
  $$(".main-nav a").forEach((link) => link.classList.toggle("active", link.dataset.screen === name || (name === "detail" && link.dataset.screen === "home")));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLiveFeed() {
  const names = ["Aditya", "Riya", "Bima", "Nadia", "Aldi", "Sasa"];
  const items = ["1000 Diamonds", "Weekly Pass", "660 UC", "1125 Points", "80 Robux"];
  $("#liveFeed").innerHTML = Array.from({ length: 3 }, (_, index) => {
    const name = names[(Date.now() / 1000 + index | 0) % names.length];
    const item = items[(Date.now() / 1300 + index | 0) % items.length];
    return `<p><b>${name}**</b> baru saja membeli <em>${item}</em> · ${index * 18 + 2} detik lalu</p>`;
  }).join("");
}

function renderTransactions() {
  $("#recentStrip").innerHTML = transactions.slice(0, 3).map((row) => `
    <article>
      <strong>${row[0]}</strong>
      <p>${row[1]}</p>
      <span class="status ${row[4] === "PENDING" ? "pending" : "success"}">${row[4]}</span>
    </article>
  `).join("");
}

function renderLeaderboard() {
  $("#leaderboardGrid").innerHTML = leaderboard.map((row, index) => `
    <article class="leaderboard-card">
      <span class="rank-badge">${index + 1}</span>
      <div><h3>${row[0]}</h3><p>${row[2]}</p></div>
      <strong>${row[1]} XP</strong>
    </article>
  `).join("");
}

function renderCalculator() {
  $("#calcGame").innerHTML = products.map((product) => `<option value="${product.id}">${product.fullName}</option>`).join("");
  updateCalcPackages();
}

function updateCalcPackages() {
  const product = products.find((item) => item.id === $("#calcGame").value) || products[0];
  $("#calcPackage").innerHTML = product.items.map((item, index) => `<option value="${index}">${item[0]} - ${idr.format(item[1])}</option>`).join("");
  calculateTotal();
}

function calculateTotal() {
  const product = products.find((item) => item.id === $("#calcGame").value) || products[0];
  const item = product.items[Number($("#calcPackage").value || 0)];
  const qty = Math.max(1, Number($("#calcQty").value || 1));
  $("#calcTotal").textContent = idr.format(item[1] * qty);
  $("#calcDesc").textContent = `${product.name} - ${item[0]} x ${qty}`;
}

function renderAdmin(tab = "overview") {
  const content = $("#adminContent");
  const title = $("#adminTitle");
  const subtitle = $("#adminSubtitle");

  if (tab === "overview") {
    title.textContent = "System Overview";
    subtitle.textContent = "Monitoring real-time platform performance";
    content.innerHTML = `
      <div class="metric-grid">
        <article><span>RP</span><small>+12.4%</small><h3>Total Revenue</h3><strong>Rp<br>124.500.000</strong><i style="--w:72%"></i></article>
        <article><span>OR</span><small>+8.2%</small><h3>Total Orders</h3><strong>1,429</strong><i style="--w:55%"></i></article>
        <article><span>US</span><small>+24.5%</small><h3>Active Users</h3><strong>42,891</strong><i style="--w:88%"></i></article>
        <article><span>OK</span><small class="down">-1.4%</small><h3>Success Rate</h3><strong>99.2%</strong><i style="--w:100%;--bar:#ffa69e"></i></article>
      </div>
      <div class="admin-content">
        <section class="transaction-panel">
          <div class="panel-head"><h2>Live Transactions</h2><a href="#" data-admin-tab="transactions">View All</a></div>
          <table><thead><tr><th>Transaction ID</th><th>Product</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead><tbody>${transactionRows()}</tbody></table>
        </section>
        <aside class="selling-panel">
          <h2>Top Selling</h2>
          <div>${sellingRows()}</div>
          <hr>
          <div class="server-load"><div><strong>Server Load</strong><span>OPTIMAL</span></div><div class="load-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small>LAST 10 MINUTES REAL-TIME SYNC</small></div>
        </aside>
      </div>`;
  }

  if (tab === "products") {
    title.textContent = "Products";
    subtitle.textContent = "Tambah, edit, hapus, dan preview produk top up";
    content.innerHTML = `
      <form class="admin-product-form" id="productForm">
        <input name="name" placeholder="Nama produk" required>
        <input name="fullName" placeholder="Nama lengkap" required>
        <select name="category">
          <option value="mobile">Mobile</option>
          <option value="pc">PC / Console</option>
        </select>
        <input name="genre" placeholder="Genre / label" required>
        <input name="image" placeholder="Path gambar, contoh assets/products/mlbb.webp" required>
        <input name="price" type="number" min="1000" placeholder="Harga utama" required>
        <button type="submit" id="productSubmit">Tambah Produk</button>
        <button type="button" id="cancelEdit" class="ghost-admin">Reset</button>
      </form>
      <div class="admin-product-grid">${products.map((product) => `
        <article class="admin-product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.category.toUpperCase()} · ${product.genre} · ${product.items.length} nominal</p>
          <div class="admin-card-actions">
            <button data-open-product="${product.id}">Preview</button>
            <button data-edit-product="${product.id}">Edit</button>
            <button class="danger-admin" data-delete-product="${product.id}">Hapus</button>
          </div>
        </article>
      `).join("")}</div>`;
  }

  if (tab === "transactions") {
    title.textContent = "Transactions";
    subtitle.textContent = "Pantau status order dan pembayaran";
    content.innerHTML = `<section class="transaction-panel"><table><thead><tr><th>Transaction ID</th><th>Product</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead><tbody>${transactionRows()}</tbody></table></section>`;
  }

  if (tab === "leaderboard") {
    title.textContent = "Leaderboard";
    subtitle.textContent = "User dengan aktivitas transaksi tertinggi";
    content.innerHTML = `<div class="leaderboard-grid" style="width:100%">${leaderboard.map((row, index) => `<article class="leaderboard-card"><span class="rank-badge">${index + 1}</span><div><h3>${row[0]}</h3><p>${row[2]}</p></div><strong>${row[1]} XP</strong></article>`).join("")}</div>`;
  }

  if (tab === "settings") {
    title.textContent = "Settings";
    subtitle.textContent = "Konfigurasi storefront dan promosi";
    content.innerHTML = `<section class="admin-settings-card"><label>Nama Website<input value="ngegameyukz"></label><label>Promo Aktif<input value="Bonus Topup hingga 50%"></label><button id="saveSettings">Simpan Pengaturan</button></section>`;
  }

  bindProductButtons();
  bindProductCrud();
  $$("[data-admin-tab]").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    switchAdminTab(button.dataset.adminTab);
  }));
  $("#saveSettings")?.addEventListener("click", () => toast("Pengaturan admin tersimpan"));
}

function bindProductCrud() {
  const form = $("#productForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name").trim();
    const fullName = data.get("fullName").trim();
    const category = data.get("category");
    const genre = data.get("genre").trim().toUpperCase();
    const image = data.get("image").trim();
    const price = Number(data.get("price"));
    const productData = {
      name,
      fullName,
      category,
      genre,
      image,
      flashIcon: name.slice(0, 2).toUpperCase(),
      flashName: `${name} Starter Pack`,
      publisher: name,
      discount: "-5%",
      oldPrice: Math.round(price * 1.1),
      price,
      desc: `Top up ${fullName} cepat dan aman di ngegameyukz.`,
      items: [["Starter Pack", price], ["Value Pack", price * 2], ["Premium Pack", price * 4]]
    };

    if (editingProductId) {
      products = products.map((product) => product.id === editingProductId ? { ...product, ...productData } : product);
      toast(`${name} berhasil diedit`);
    } else {
      products.unshift({ id: `custom-${Date.now()}`, ...productData });
      toast(`${name} berhasil ditambahkan`);
    }

    editingProductId = null;
    renderFlashSale();
    renderPopular();
    renderCalculator();
    renderAdmin("products");
  });

  $("#cancelEdit").addEventListener("click", () => {
    editingProductId = null;
    form.reset();
    $("#productSubmit").textContent = "Tambah Produk";
  });

  $$("[data-edit-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = products.find((item) => item.id === button.dataset.editProduct);
      if (!product) return;
      editingProductId = product.id;
      form.name.value = product.name;
      form.fullName.value = product.fullName;
      form.category.value = product.category;
      form.genre.value = product.genre;
      form.image.value = product.image;
      form.price.value = product.price;
      $("#productSubmit").textContent = "Simpan Perubahan";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  $$("[data-delete-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = products.find((item) => item.id === button.dataset.deleteProduct);
      if (!product) return;
      products = products.filter((item) => item.id !== product.id);
      if (activeProduct.id === product.id) {
        activeProduct = products[0];
        activeItem = activeProduct.items[0];
      }
      toast(`${product.name} dihapus`);
      renderFlashSale();
      renderPopular();
      renderCalculator();
      renderAdmin("products");
    });
  });
}

function transactionRows() {
  return transactions.map((row) => `
    <tr>
      <td>#${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${idr.format(row[3])}</td>
      <td><span class="status ${row[4] === "PENDING" ? "pending" : "success"}">${row[4]}</span></td>
    </tr>
  `).join("");
}

function sellingRows() {
  return products.slice(0, 3).map((product, index) => `
    <div class="selling-item">
      <img src="${product.image}" alt="${product.name}">
      <div><h3>${product.name}</h3><p>${[1240, 982, 845][index]} Sales</p></div>
      <b>${index + 1}</b>
    </div>
  `).join("");
}

function switchAdminTab(tab) {
  $$(".admin-sidebar [data-admin-tab]").forEach((button) => button.classList.toggle("active", button.dataset.adminTab === tab));
  renderAdmin(tab);
}

function rotateHero(index = (heroIndex + 1) % heroSlides.length) {
  heroIndex = index;
  const slide = heroSlides[heroIndex];
  $("#heroBadge").textContent = slide.badge;
  $("#heroTitle").innerHTML = slide.title;
  $("#heroVisual").style.backgroundImage = `
    radial-gradient(circle at 62% 18%, rgba(255, 77, 184, 0.9), transparent 8%),
    conic-gradient(from 260deg at 63% 42%, transparent 0deg, rgba(255,77,184,.18) 55deg, rgba(255,77,184,.9) 72deg, rgba(119,72,255,.5) 94deg, transparent 120deg, transparent 360deg),
    linear-gradient(90deg, rgba(8,20,35,0.96) 0%, rgba(8,20,35,0.56) 42%, rgba(8,20,35,0.16) 100%),
    url("${slide.image}")`;
  $$("#heroDots button").forEach((button, idx) => button.classList.toggle("active", idx === heroIndex));
}

function tickCountdown() {
  countdownSeconds = Math.max(0, countdownSeconds - 1);
  const h = String(Math.floor(countdownSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(countdownSeconds % 60).padStart(2, "0");
  $("#countdown").textContent = `${h} : ${m} : ${s}`;
}

function trackOrder() {
  const value = $("#trackInput").value.trim().replace("#", "").toUpperCase();
  const found = transactions.find((row) => row[0].toUpperCase() === value);
  const result = $("#trackResult");
  if (!found) {
    result.innerHTML = `<span>Tidak ditemukan</span><h2>Invoice belum terdaftar</h2><p>Coba invoice demo: TX-90214, TX-90215, INV-2841-ML.</p>`;
    toast("Invoice tidak ditemukan");
    return;
  }
  result.innerHTML = `<span>${found[4]}</span><h2>#${found[0]} - ${found[1]}</h2><p>Metode ${found[2]} dengan total ${idr.format(found[3])}.</p>`;
  toast("Status transaksi ditemukan");
}

function copyToClipboard(text, message) {
  navigator.clipboard?.writeText(text).catch(() => {});
  toast(message);
}

function setupEvents() {
  $$("[data-screen]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen(item.dataset.screen);
    });
  });

  $$("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-filter]").forEach((filter) => filter.classList.remove("active"));
      button.classList.add("active");
      renderPopular(button.dataset.filter);
    });
  });

  $$("#heroDots button").forEach((button, index) => button.addEventListener("click", () => rotateHero(index)));

  $$("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-auth-tab]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      $(".submit-auth").textContent = button.dataset.authTab === "register" ? "DAFTAR SEKARANG" : "MASUK SEKARANG";
    });
  });

  $("#authForm").addEventListener("submit", (event) => {
    event.preventDefault();
    userName = $("#authName").value.trim() || "Rizky Perdana";
    $("#welcomeName").textContent = `Halo, ${userName}!`;
    showScreen("user");
    toast(`Selamat datang, ${userName}`);
  });

  $$("[data-social]").forEach((button) => button.addEventListener("click", () => toast(`Login ${button.dataset.social} disimulasikan`)));
  $("#forgotPassword").addEventListener("click", (event) => { event.preventDefault(); toast("Link reset password dikirim (demo)"); });
  $("#localeToggle").addEventListener("click", () => toast("Bahasa dan mata uang sudah ID / IDR"));

  $("#searchInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const term = event.target.value.trim().toLowerCase();
    const found = products.find((product) => product.name.toLowerCase().includes(term) || product.fullName.toLowerCase().includes(term));
    if (found) openProduct(found.id);
    else toast("Game belum ditemukan");
  });

  $("#showAllFlash").addEventListener("click", (event) => {
    event.preventDefault();
    renderPopular("all");
    toast("Semua produk flash sale ditampilkan");
  });

  $("#loadMoreGames").addEventListener("click", () => {
    $("#popularGrid").innerHTML = products.map((product) => `
      <article class="game-card" data-open-product="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <span class="genre">${product.genre}</span>
        <h3>${product.name}</h3>
      </article>`).join("");
    bindProductButtons();
    toast("Produk tambahan dimuat");
  });

  $("#applyPromo").addEventListener("click", () => {
    const code = $("#promoInput").value.trim().toUpperCase();
    discountRate = code === "NYZ50" ? 0.5 : code === "FLASH10" ? 0.1 : code === "LOYAL5" ? 0.05 : 0;
    updateSummary();
    toast(discountRate ? `Promo ${code} aktif` : "Kode promo tidak valid");
  });

  $$("#paymentOptions button").forEach((button) => {
    button.addEventListener("click", () => {
      $$("#paymentOptions button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      selectedPayment = button.dataset.payment;
      updateSummary();
      toast(`Metode ${selectedPayment} dipilih`);
    });
  });

  $("#orderNow").addEventListener("click", () => {
    const invoice = `TX-${Math.floor(90000 + Math.random() * 999)}`;
    transactions.unshift([invoice, `${activeProduct.name} ${activeItem[0]}`, selectedPayment, totalPrice(), "SUCCESS"]);
    renderAdmin();
    renderTransactions();
    renderLiveFeed();
    toast(`Pesanan #${invoice} berhasil dibuat`);
  });

  $("#trackButton").addEventListener("click", trackOrder);
  $("#trackInput").addEventListener("keydown", (event) => { if (event.key === "Enter") trackOrder(); });
  $("#calcGame").addEventListener("change", updateCalcPackages);
  $("#calcPackage").addEventListener("change", calculateTotal);
  $("#calcQty").addEventListener("input", calculateTotal);
  $("#calcButton").addEventListener("click", () => { calculateTotal(); toast("Total kalkulator diperbarui"); });

  $$("[data-copy-promo]").forEach((button) => button.addEventListener("click", () => copyToClipboard(button.dataset.copyPromo, `Kode ${button.dataset.copyPromo} disalin`)));
  $$("[data-copy-code]").forEach((button) => button.addEventListener("click", () => copyToClipboard(button.dataset.copyCode, "Kode voucher disalin")));
  $$("[data-legal]").forEach((item) => item.addEventListener("click", (event) => { event.preventDefault(); toast(`${item.dataset.legal} dibuka (demo)`); }));
  $$("[data-setting]").forEach((button) => button.addEventListener("click", () => toast(`${button.dataset.setting} dibuka (demo)`)));
  $("#redeemPoints").addEventListener("click", () => toast("Poin ditukar menjadi voucher diskon (demo)"));
  $("#addBalance").addEventListener("click", () => toast("Form isi saldo dibuka (demo)"));
  $("#topupBalance").addEventListener("click", () => toast("Saldo aktif: Rp 1.250.000"));
  $("#footerContact").addEventListener("click", (event) => { event.preventDefault(); $("#chatPanel").classList.add("open"); });
  $("#footerGuide").addEventListener("click", (event) => { event.preventDefault(); toast("Cara beli: pilih game, nominal, pembayaran, lalu pesan"); });
  $("#footerFaq").addEventListener("click", (event) => { event.preventDefault(); toast("FAQ dibuka (demo)"); });
  $("#chatButton").addEventListener("click", () => $("#chatPanel").classList.toggle("open"));
  $("#closeChat").addEventListener("click", () => $("#chatPanel").classList.remove("open"));
  $$("[data-chat-choice]").forEach((button) => button.addEventListener("click", () => toast(`CS menerima topik: ${button.dataset.chatChoice}`)));

  $$(".admin-sidebar [data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => switchAdminTab(button.dataset.adminTab));
  });
}

function init() {
  renderFlashSale();
  renderPopular();
  renderNominals();
  updateSummary();
  renderLiveFeed();
  renderTransactions();
  renderLeaderboard();
  renderCalculator();
  renderAdmin();
  setupEvents();
  bindProductButtons();
  setInterval(tickCountdown, 1000);
  setInterval(() => rotateHero(), 6000);
  setInterval(renderLiveFeed, 5000);
}

init();
