// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form handling
document.querySelector('.newsletter button').addEventListener('click', function() {
    const emailInput = document.querySelector('.newsletter input');
    const email = emailInput.value.trim();
    
    if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
        emailInput.focus();
    }
});

// Shop Now buttons functionality
document.querySelectorAll('.hero-cta, .collection-btn, .btn-light').forEach(button => {
    button.addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('#collections').offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Product hover effects enhancement
document.querySelectorAll('.product-card, .sale-product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Cart functionality
const cartIcon = document.querySelector('.fa-shopping-bag').parentElement;
cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    const cartCount = this.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    
    // Show cart items popup
    const cartItems = [
        { name: 'Banarasi Silk Saree', price: '₹ 8,499', quantity: 1 },
        { name: 'Designer Lehenga', price: '₹ 12,999', quantity: 1 },
        { name: 'Bridal Jewelry Set', price: '₹ 5,499', quantity: 1 }
    ];
    
    let cartHTML = '<div class="cart-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 10000; max-width: 400px; width: 90%;">';
    cartHTML += '<h3 style="margin-bottom: 20px; color: var(--accent-maroon);">Your Cart</h3>';
    
    cartItems.forEach(item => {
        cartHTML += `<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
            <div>
                <strong>${item.name}</strong><br>
                <small>Quantity: ${item.quantity}</small>
            </div>
            <div>${item.price}</div>
        </div>`;
    });
    
    cartHTML += '<div style="margin-top: 20px; text-align: center;">';
    cartHTML += '<button onclick="this.parentElement.parentElement.remove()" style="background: var(--accent-gold); color: white; border: none; padding: 10px 30px; border-radius: 5px; cursor: pointer; margin-right: 10px;">Continue Shopping</button>';
    cartHTML += '<button style="background: var(--accent-maroon); color: white; border: none; padding: 10px 30px; border-radius: 5px; cursor: pointer;">Checkout</button>';
    cartHTML += '</div></div>';
    
    // Remove existing popup if any
    const existingPopup = document.querySelector('.cart-popup');
    if(existingPopup) {
        existingPopup.remove();
    } else {
        const popup = document.createElement('div');
        popup.innerHTML = cartHTML;
        document.body.appendChild(popup);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '9999';
        overlay.onclick = function() {
            popup.remove();
            overlay.remove();
        };
        document.body.appendChild(overlay);
    }
});

// Search functionality
const searchIcon = document.querySelector('.fa-search').parentElement;
searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    const searchTerm = prompt('What saree are you looking for? (e.g., Banarasi, Lehenga, Jewelry)');
    if(searchTerm) {
        alert(`Searching for: "${searchTerm}"\n\nNote: This is a demo. In a real website, this would search our inventory.`);
        
        // Highlight matching items (demo)
        const allText = document.body.innerText;
        if(allText.toLowerCase().includes(searchTerm.toLowerCase())) {
            // Could add search highlighting logic here
            console.log(`Found "${searchTerm}" in content`);
        }
    }
});

// Sale countdown timer
function updateCountdown() {
    const timerElement = document.getElementById('countdown-timer');
    if(!timerElement) return;
    
    const now = new Date();
    // Set sale end to 2 days from now
    const endDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (30 * 60 * 1000) + (15 * 1000));
    
    const diff = endDate - now;
    
    if(diff <= 0) {
        timerElement.textContent = 'Sale Ended!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    timerElement.textContent = `${days} days ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize countdown timer
setInterval(updateCountdown, 1000);
updateCountdown();

// Add animation to collection cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.sale-product-card, .collection-card, .product-card').forEach(card => {
    observer.observe(card);
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if(hero && window.innerWidth > 768) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Initialize animations on page load
window.addEventListener('load', function() {
    // Add loaded class for fade-in effects
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.sale-product-card, .product-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Mobile menu toggle (for future enhancement)
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav ul');
    const navActions = document.querySelector('.nav-actions');
    
    if(window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.color = 'var(--primary-dark)';
        mobileMenuBtn.style.cursor = 'pointer';
        
        header.querySelector('.header-container').appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
            navActions.classList.toggle('show');
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// Update cart count from local storage if available
window.addEventListener('load', function() {
    const savedCartCount = localStorage.getItem('jagdambaCartCount');
    if(savedCartCount) {
        const cartCount = document.querySelector('.cart-count');
        if(cartCount) {
            cartCount.textContent = savedCartCount;
        }
    }
});

// Save cart count to local storage when changed
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if(cartCount) {
        cartCount.textContent = count;
        localStorage.setItem('jagdambaCartCount', count);
    }
}

// Example: Add to cart function
function addToCart(productName, productPrice) {
    let currentCount = parseInt(document.querySelector('.cart-count').textContent);
    updateCartCount(currentCount + 1);
    
    // Show notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = 'var(--accent-gold)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notification.innerHTML = `Added <strong>${productName}</strong> to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);