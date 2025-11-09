// ===== PRODUCTS DATA =====
const productsData = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        category: "smartphones",
        price: 1199,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
        rating: 4.8,
        reviews: 245,
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        category: "laptops",
        price: 2499,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        rating: 4.9,
        reviews: 189,
        description: "Powerful laptop with M3 Max chip, stunning Liquid Retina XDR display.",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        category: "audio",
        price: 249,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500",
        rating: 4.7,
        reviews: 512,
        description: "Active noise cancellation, adaptive audio, and personalized spatial audio.",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "iPad Pro 12.9\"",
        category: "tablets",
        price: 1099,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        rating: 4.8,
        reviews: 156,
        description: "The ultimate iPad experience with M2 chip and stunning display.",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Apple Watch Ultra 2",
        category: "wearables",
        price: 799,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
        rating: 4.9,
        reviews: 98,
        description: "Rugged smartwatch built for adventure with precision GPS and long battery life.",
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: "Magic Keyboard",
        category: "accessories",
        price: 99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        rating: 4.6,
        reviews: 234,
        description: "Wireless keyboard with rechargeable battery and bluetooth connectivity.",
        inStock: true,
        featured: true
    },
    {
        id: 7,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        price: 1299,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        rating: 4.7,
        reviews: 178,
        description: "Flagship Android phone with S Pen, 200MP camera, and AI features.",
        inStock: true,
        featured: false
    },
    {
        id: 8,
        name: "Dell XPS 15",
        category: "laptops",
        price: 1899,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
        rating: 4.6,
        reviews: 145,
        description: "Premium Windows laptop with InfinityEdge display and powerful performance.",
        inStock: true,
        featured: false
    },
    {
        id: 9,
        name: "Sony WH-1000XM5",
        category: "audio",
        price: 399,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
        rating: 4.8,
        reviews: 423,
        description: "Industry-leading noise canceling headphones with exceptional sound quality.",
        inStock: true,
        featured: false
    },
    {
        id: 10,
        name: "Samsung Galaxy Tab S9",
        category: "tablets",
        price: 799,
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
        rating: 4.5,
        reviews: 87,
        description: "Premium Android tablet with S Pen included and water resistance.",
        inStock: true,
        featured: false
    },
    {
        id: 11,
        name: "Fitbit Charge 6",
        category: "wearables",
        price: 159,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
        rating: 4.4,
        reviews: 267,
        description: "Advanced fitness tracker with heart rate monitoring and GPS.",
        inStock: true,
        featured: false
    },
    {
        id: 12,
        name: "Logitech MX Master 3S",
        category: "accessories",
        price: 99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        rating: 4.7,
        reviews: 312,
        description: "Premium wireless mouse with ergonomic design and customizable buttons.",
        inStock: true,
        featured: false
    }
];

// ===== UTILITY FUNCTIONS =====

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Add to cart function
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showToast(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Item removed from cart');
}

// Update quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
    }
}

// Create product card HTML
function createProductCard(product, showQuickView = true) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                ${showQuickView ? `<button class="quick-view-btn" onclick="showQuickView(${product.id})">Quick View</button>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show quick view modal
function showQuickView(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px;">
            </div>
            <div>
                <div style="color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">${product.category}</div>
                <h2 style="margin-bottom: 1rem;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <span style="color: #fbbf24;">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span style="color: var(--text-secondary);">(${product.reviews} reviews)</span>
                </div>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">${product.description}</p>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1.5rem;">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id}); document.getElementById('quickViewModal').classList.remove('active');" style="width: 100%;">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// ===== THEME TOGGLE =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== HOME PAGE =====
function initHomePage() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (featuredProductsContainer) {
        const featuredProducts = productsData.filter(p => p.featured).slice(0, 6);
        featuredProductsContainer.innerHTML = featuredProducts.map(product => 
            createProductCard(product)
        ).join('');
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && message) {
                showToast('Message sent successfully!');
                contactForm.reset();
            }
        });
    }
}

// ===== SHOP PAGE =====
function initShopPage() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    let filteredProducts = [...productsData];
    let currentSearchTerm = '';
    
    function renderProducts() {
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                    <div style="font-size: 4rem; opacity: 0.5; margin-bottom: 1rem;">😞</div>
                    <h3>No products found</h3>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your filters or search terms</p>
                    ${currentSearchTerm ? `<button class="btn btn-outline" onclick="clearSearch()" style="margin-top: 1rem;">Clear Search</button>` : ''}
                </div>
            `;
        } else {
            productsContainer.innerHTML = filteredProducts.map(product => 
                createProductCardWithHighlight(product, currentSearchTerm)
            ).join('');
        }
    }
    
    // Create product card with search term highlighting
    function createProductCardWithHighlight(product, searchTerm) {
        let productName = product.name;
        
        // Highlight matching text if search term exists
        if (searchTerm && searchTerm.length > 0) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            productName = product.name.replace(regex, '<mark style="background-color: var(--primary-light); color: var(--background); padding: 0 2px; border-radius: 2px;">$1</mark>');
        }
        
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                    <button class="quick-view-btn" onclick="showQuickView(${product.id})">Quick View</button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${productName}</h3>
                    <div class="product-rating">
                        <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initial render
    renderProducts();
    
    // Search functionality for shop page search bar
    const shopSearchInput = document.getElementById('shopSearch');
    if (shopSearchInput) {
        // Live search as user types
        shopSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim();
            applyFilters();
        });
        
        // Also trigger on Enter key
        shopSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                currentSearchTerm = e.target.value.trim();
                applyFilters();
            }
        });
    }
    
    // Navigation search bar functionality
    const navSearchInput = document.getElementById('searchInput');
    if (navSearchInput) {
        navSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim();
            // Sync with shop search if it exists
            if (shopSearchInput) {
                shopSearchInput.value = currentSearchTerm;
            }
            applyFilters();
        });
        
        navSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                currentSearchTerm = e.target.value.trim();
                if (shopSearchInput) {
                    shopSearchInput.value = currentSearchTerm;
                }
                applyFilters();
            }
        });
    }
    
    // Global clear search function
    window.clearSearch = function() {
        currentSearchTerm = '';
        if (shopSearchInput) shopSearchInput.value = '';
        if (navSearchInput) navSearchInput.value = '';
        applyFilters();
    };
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    
    function applyFilters() {
        const searchTerm = currentSearchTerm.toLowerCase();
        const category = categoryFilter ? categoryFilter.value : 'all';
        const priceRange = priceFilter ? priceFilter.value : 'all';
        const sortBy = sortFilter ? sortFilter.value : 'featured';
        
        // Start with all products
        filteredProducts = productsData.filter(product => {
            // Search filter - search in name, category, and description
            const matchesSearch = !searchTerm || 
                                product.name.toLowerCase().includes(searchTerm) ||
                                product.category.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = category === 'all' || product.category === category;
            
            // Price filter
            let matchesPrice = true;
            if (priceRange === 'under-100') matchesPrice = product.price < 100;
            else if (priceRange === '100-500') matchesPrice = product.price >= 100 && product.price < 500;
            else if (priceRange === '500-1000') matchesPrice = product.price >= 500 && product.price < 1000;
            else if (priceRange === 'over-1000') matchesPrice = product.price >= 1000;
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
        
        // Sort products
        if (sortBy === 'price-low') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'name') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        renderProducts();
    }
}

// ===== CART PAGE =====
function initCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    function renderCart() {
        const cart = getCart();
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                    <a href="shop.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            document.querySelector('.cart-summary').style.display = 'none';
        } else {
            document.querySelector('.cart-summary').style.display = 'block';
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div style="font-weight: 600; color: var(--primary-color);">$${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="remove-btn" onclick="removeFromCartPage(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');
            
            updateCartSummary();
        }
    }
    
    function updateCartSummary() {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 10) : 0;
        const total = subtotal + shipping;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    window.updateCartQuantity = function(productId, change) {
        updateQuantity(productId, change);
        renderCart();
    };
    
    window.removeFromCartPage = function(productId) {
        removeFromCart(productId);
        renderCart();
    };
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                showToast('Checkout functionality coming soon!');
            }
        });
    }
    
    renderCart();
}

// ===== MODAL CLOSE =====
function initModal() {
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initTheme();
    initNavigation();
    initModal();
    
    // Initialize page-specific functionality
    if (document.getElementById('featuredProducts')) {
        initHomePage();
    }
    
    if (document.getElementById('productsContainer')) {
        initShopPage();
    }
    
    if (document.getElementById('cartItems')) {
        initCartPage();
    }
});