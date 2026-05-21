/* ========================================
   KICKS STORE - JavaScript
   Cart, Filters, Product Detail, Navigation
   ======================================== */

// ---- Product Data ----
const products = [
  {
    id: "aj1-chicago",
    name: "Air Jordan 1 Retro High OG",
    brand: "Jordan",
    category: "Jordan",
    price: 389000,
    originalPrice: null,
    image: "/images/sneaker-1.jpg",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    isNew: true,
    isSale: false,
    description:
      "The Air Jordan 1 Retro High OG brings back the iconic silhouette that started it all. Premium leather construction with the classic Chicago colorway that changed sneaker culture forever.",
  },
  {
    id: "aj4-cement",
    name: "Air Jordan 4 Retro",
    brand: "Jordan",
    category: "Jordan",
    price: 439000,
    originalPrice: 489000,
    image: "/images/sneaker-2.jpg",
    sizes: [39, 40, 41, 42, 43, 44],
    isNew: false,
    isSale: true,
    description:
      "The Air Jordan 4 Retro features premium construction with visible Air-Sole cushioning. The White Cement colorway is one of the most sought-after in sneaker history.",
  },
  {
    id: "dunk-low-panda",
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    category: "Nike",
    price: 259000,
    originalPrice: null,
    image: "/images/sneaker-3.jpg",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    isNew: true,
    isSale: false,
    description:
      "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with the classic Panda colorway. A crisp black and white combo with padded, low-cut collar.",
  },
  {
    id: "nb-550-green",
    name: "New Balance 550",
    brand: "New Balance",
    category: "New Balance",
    price: 289000,
    originalPrice: null,
    image: "/images/sneaker-4.jpg",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    isNew: false,
    isSale: false,
    description:
      "The New Balance 550 returns from the archive as a modern wardrobe staple. Originally a basketball shoe from the '80s, it features a clean leather upper with a forest green accent.",
  },
  {
    id: "yeezy-350-zebra",
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    category: "Adidas",
    price: 519000,
    originalPrice: null,
    image: "/images/sneaker-5.jpg",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    isNew: false,
    isSale: false,
    description:
      "The adidas Yeezy Boost 350 V2 features iconic Primeknit upper with the famous Zebra pattern. Full-length Boost cushioning delivers cloud-like comfort.",
  },
  {
    id: "af1-white",
    name: "Nike Air Force 1 Low '07",
    brand: "Nike",
    category: "Nike",
    price: 229000,
    originalPrice: null,
    image: "/images/sneaker-6.jpg",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    isNew: true,
    isSale: false,
    description:
      "The radiance lives on in the Nike Air Force 1 '07. This basketball original puts a fresh spin on what you know best: crisp overlays, bold accents, and the perfect amount of flash.",
  },
  {
    id: "am90-infrared",
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Nike",
    price: 319000,
    originalPrice: 359000,
    image: "/images/sneaker-7.jpg",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    isNew: false,
    isSale: true,
    description:
      "Nothing as iconic as an original. The Nike Air Max 90 stays true to its OG roots with the iconic Infrared colorway, visible Air cushioning, and waffle outsole.",
  },
  {
    id: "aj11-concord",
    name: "Air Jordan 11 Retro",
    brand: "Jordan",
    category: "Jordan",
    price: 489000,
    originalPrice: null,
    image: "/images/sneaker-8.jpg",
    sizes: [40, 41, 42, 43, 44, 45],
    isNew: false,
    isSale: false,
    description:
      "The Air Jordan 11 Retro features premium patent leather, a full-length Air-Sole unit, and carbon fiber plate. The Concord colorway is one of Michael Jordan's most legendary shoes.",
  },
];

const categories = [
  { name: "Jordan", slug: "Jordan", image: "/images/category-jordan.jpg" },
  { name: "Nike", slug: "Nike", image: "/images/category-nike.jpg" },
  { name: "Adidas", slug: "Adidas", image: "/images/category-adidas.jpg" },
  {
    name: "New Balance",
    slug: "New Balance",
    image: "/images/category-newbalance.jpg",
  },
];

// ---- Utility ----
function formatPrice(price) {
  return new Intl.NumberFormat("mn-MN").format(price) + "\u20AE";
}

// ---- State ----
let cart = [];
let currentFilter = "All";
let currentSort = "newest";
let selectedSize = null;

// ---- DOM READY ----
document.addEventListener("DOMContentLoaded", () => {
  renderHomePage();
  renderShopPage();
  bindNavigation();
  bindCart();
  bindMobileMenu();
  showPage("home");
});

// ---- NAVIGATION ----
function bindNavigation() {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-nav");
      showPage(page);
      // close mobile menu
      document.getElementById("mobileMenu").classList.remove("open");
      // update active links
      document
        .querySelectorAll("[data-nav]")
        .forEach((l) => l.classList.remove("active"));
      document
        .querySelectorAll(`[data-nav="${page}"]`)
        .forEach((l) => l.classList.add("active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function showPage(page) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add("active");
}

function bindMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// ---- RENDER HOME PAGE ----
function renderHomePage() {
  // Featured products (new items)
  const featured = products.filter((p) => p.isNew);
  const featuredGrid = document.getElementById("featuredGrid");
  featured.forEach((p) => {
    featuredGrid.appendChild(createProductCard(p));
  });

  // New arrivals (rest)
  const arrivals = products.filter((p) => !p.isNew).slice(0, 4);
  const arrivalsGrid = document.getElementById("arrivalsGrid");
  arrivals.forEach((p) => {
    arrivalsGrid.appendChild(createProductCard(p));
  });

  // Categories
  const catGrid = document.getElementById("categoryGrid");
  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name} sneakers" />
      <div class="category-overlay">
        <h3>${cat.name}</h3>
        <span>Shop Collection</span>
      </div>
    `;
    card.addEventListener("click", () => {
      currentFilter = cat.slug;
      showPage("shop");
      renderShopProducts();
      updateFilterChips();
      document.querySelectorAll("[data-nav]").forEach((l) => l.classList.remove("active"));
      document.querySelectorAll('[data-nav="shop"]').forEach((l) => l.classList.add("active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    catGrid.appendChild(card);
  });
}

// ---- RENDER SHOP PAGE ----
function renderShopPage() {
  // Filter chips
  const chipContainer = document.getElementById("filterChips");
  ["All", "Jordan", "Nike", "Adidas", "New Balance"].forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = `chip ${cat === currentFilter ? "active" : ""}`;
    chip.textContent = cat;
    chip.setAttribute("data-filter", cat);
    chip.addEventListener("click", () => {
      currentFilter = cat;
      renderShopProducts();
      updateFilterChips();
    });
    chipContainer.appendChild(chip);
  });

  // Sort
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderShopProducts();
  });

  renderShopProducts();
}

function updateFilterChips() {
  document.querySelectorAll("#filterChips .chip").forEach((chip) => {
    chip.classList.toggle("active", chip.getAttribute("data-filter") === currentFilter);
  });
}

function renderShopProducts() {
  const grid = document.getElementById("shopGrid");
  grid.innerHTML = "";

  let filtered =
    currentFilter === "All"
      ? [...products]
      : products.filter((p) => p.category === currentFilter);

  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px 0; color:var(--fg-muted)">No products found in this category.</div>`;
    return;
  }

  filtered.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });

  // Update count
  const countEl = document.getElementById("productCount");
  if (countEl) countEl.textContent = `${filtered.length} products`;
}

// ---- PRODUCT CARD ----
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-card-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-card-badges">
        ${product.isNew ? '<span class="badge badge-new">New</span>' : ""}
        ${product.isSale ? '<span class="badge badge-sale">Sale</span>' : ""}
      </div>
    </div>
    <div class="product-card-info">
      <div class="product-card-brand">${product.brand}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
      </div>
    </div>
  `;
  card.addEventListener("click", () => openProductDetail(product));
  return card;
}

// ---- PRODUCT DETAIL MODAL ----
function openProductDetail(product) {
  selectedSize = null;
  const overlay = document.getElementById("productDetailOverlay");
  const container = document.getElementById("productDetailContent");

  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail-info">
      <div class="product-detail-brand">${product.brand}</div>
      <h2 class="product-detail-name">${product.name}</h2>
      <div class="product-detail-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
      </div>
      <p class="product-detail-desc">${product.description}</p>
      <div class="size-label">Select Size (EU)</div>
      <div class="size-grid" id="sizeGrid">
        ${product.sizes.map((s) => `<button class="size-btn" data-size="${s}">${s}</button>`).join("")}
      </div>
      <button class="add-to-cart-btn" id="addToCartBtn" disabled>Select a Size</button>
    </div>
  `;

  // Size selection
  container.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSize = parseInt(btn.getAttribute("data-size"));
      const addBtn = document.getElementById("addToCartBtn");
      addBtn.disabled = false;
      addBtn.textContent = `Add to Cart - ${formatPrice(product.price)}`;
    });
  });

  // Add to cart
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    const addBtn = document.getElementById("addToCartBtn");
    addBtn.classList.add("added");
    addBtn.textContent = "Added to Cart!";
    setTimeout(() => {
      addBtn.classList.remove("added");
      addBtn.textContent = `Add to Cart - ${formatPrice(product.price)}`;
    }, 2000);
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProductDetail();
  });
}

function closeProductDetail() {
  const overlay = document.getElementById("productDetailOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ---- CART ----
function bindCart() {
  document.getElementById("cartBtn").addEventListener("click", toggleCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
}

function toggleCart() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  const isOpen = panel.classList.contains("open");
  if (isOpen) {
    closeCart();
  } else {
    panel.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function addToCart(product, size) {
  const existing = cart.find(
    (item) => item.product.id === product.id && item.size === size
  );
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, size, quantity: 1 });
  }
  updateCartUI();
  showToast(`${product.name} (EU ${size}) added to cart`);
}

function removeFromCart(productId, size) {
  cart = cart.filter(
    (item) => !(item.product.id === productId && item.size === size)
  );
  updateCartUI();
}

function updateQuantity(productId, size, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId, size);
    return;
  }
  const item = cart.find(
    (i) => i.product.id === productId && i.size === size
  );
  if (item) item.quantity = newQty;
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Badge
  const badge = document.getElementById("cartBadge");
  badge.textContent = totalItems;
  badge.classList.toggle("show", totalItems > 0);

  // Cart header count
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

  // Cart items
  const cartItemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z"/>
        </svg>
        <p>Your cart is empty</p>
        <p style="font-size:0.75rem">Add some sneakers to get started</p>
      </div>
    `;
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.product.image}" alt="${item.product.name}" />
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-meta">${item.product.brand} &middot; EU ${item.size}</div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatPrice(item.product.price * item.quantity)}</span>
            <div style="display:flex;align-items:center;gap:4px">
              <div class="qty-controls">
                <button class="qty-btn" onclick="updateQuantity('${item.product.id}', ${item.size}, ${item.quantity - 1})">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.product.id}', ${item.size}, ${item.quantity + 1})">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart('${item.product.id}', ${item.size})" aria-label="Remove item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Totals
  document.getElementById("cartSubtotal").textContent = formatPrice(totalPrice);
  document.getElementById("cartTotal").textContent = formatPrice(totalPrice);
}

// ---- TOAST ----
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
