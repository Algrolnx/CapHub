
// ===== ГЛОБАЛЬНІ ЗМІННІ =====
let cart = [];

// ===== DOM ЕЛЕМЕНТИ =====
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const contactForm = document.getElementById('contact-form');

// ===== ГОЛОВНА ФУНКЦІЯ ІНІЦІАЛІЗАЦІЇ =====
function initializeApp() {
    setupEventListeners();
    updateCartDisplay();
    console.log('CapHub App initialized successfully!');
}

// ===== НАЛАШТУВАННЯ ОБРОБНИКІВ ПОДІЙ =====
function setupEventListeners() {
    // Обробник кліку по корзині
    const cartLink = document.querySelector('[href="#cart"]');
    if (cartLink) {
        cartLink.addEventListener('click', handleCartClick);
    }

    // Обробник форми контактів
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Обробник форми входу
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }

    // Плавне прокручування для навігаційних посилань
    setupSmoothScrolling();
}

// ===== ОБРОБНИКИ ПОДІЙ =====
function handleCartClick(e) {
    e.preventDefault();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function handleContactForm(e) {
    e.preventDefault();
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
    contactForm.reset();
}

function handleLoginForm(e) {
    e.preventDefault();
    alert('Функціональність входу буде реалізована тут!');
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) {
        loginModal.hide();
    }
}

// ===== ПЛАВНЕ ПРОКРУЧУВАННЯ =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ФУНКЦІЇ КОРЗИНИ =====
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-muted">Ваша корзина порожня</p>';
    } else {
        renderCartItems();
    }
}

function renderCartItems() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartItems.innerHTML = `
        ${cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price} x ${item.quantity}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger remove-from-cart" data-product-id="${item.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `).join('')}
        <hr>
        <div class="d-flex justify-content-between">
            <strong>Загалом: $${total.toFixed(2)}</strong>
        </div>
    `;

    // Додаємо функціональність видалення товарів
    attachRemoveHandlers();
}

function attachRemoveHandlers() {
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.remove-from-cart').dataset.productId);
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
}

// ===== ГЛОБАЛЬНІ ФУНКЦІЇ =====
window.showLogin = function() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
};

window.addToCart = addToCart;

// ===== ЗАПУСК ДОДАТКУ =====
document.addEventListener('DOMContentLoaded', initializeApp);

// Альтернативний запуск, якщо DOM вже завантажений
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

