/* ==========================================
   FABULOUS ASIA TOURS - MAIN JAVASCRIPT
   Interactive Features & Functionality
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all features
  initMobileMenu();
  initScrollEffects();
  initScrollToTop();
  initFormValidation();
  initImageLazyLoading();
  initSmoothScroll();
  initActiveNavigation();
  
});

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      overlay.classList.toggle('active');
      body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }
}

/* ==========================================
   SCROLL EFFECTS
   ========================================== */

function initScrollEffects() {
  const header = document.querySelector('.main-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to header on scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('revealed');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
}

/* ==========================================
   SCROLL TO TOP BUTTON
   ========================================== */

function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   FORM VALIDATION
   ========================================== */

function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formControls = form.querySelectorAll('.form-control');
      
      formControls.forEach(control => {
        // Remove previous error states
        control.style.borderColor = '';
        
        // Validate required fields
        if (control.hasAttribute('required') && !control.value.trim()) {
          control.style.borderColor = '#dc3545';
          isValid = false;
          
          // Show error message
          showErrorMessage(control, 'This field is required');
        }
        
        // Validate email
        if (control.type === 'email' && control.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(control.value)) {
            control.style.borderColor = '#dc3545';
            isValid = false;
            showErrorMessage(control, 'Please enter a valid email');
          }
        }
        
        // Validate phone
        if (control.type === 'tel' && control.value) {
          const phoneRegex = /^[\d\s\-\+\(\)]+$/;
          if (!phoneRegex.test(control.value)) {
            control.style.borderColor = '#dc3545';
            isValid = false;
            showErrorMessage(control, 'Please enter a valid phone number');
          }
        }
      });
      
      if (isValid) {
        // Show success message
        showSuccessMessage('Your message has been sent successfully!');
        form.reset();
      }
    });
    
    // Remove error styling on input
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        this.style.borderColor = '';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });
  });
}

function showErrorMessage(element, message) {
  // Remove existing error message
  const existingError = element.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  
  element.parentElement.appendChild(errorDiv);
}

function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-notification';
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #28a745;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: fadeInRight 0.5s ease;
  `;
  successDiv.textContent = message;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => successDiv.remove(), 500);
  }, 3000);
}

/* ==========================================
   LAZY LOADING IMAGES
   ========================================== */

function initImageLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

/* ==========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================== */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================
   ACTIVE NAVIGATION HIGHLIGHTING
   ========================================== */

function initActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || 
        (currentPath === '/' && linkPath.endsWith('index.html')) ||
        (currentPath.endsWith('.html') && currentPath === linkPath)) {
      link.classList.add('active');
    }
  });
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* ==========================================
   EXPORT FUNCTIONS (if using modules)
   ========================================== */

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    isInViewport
  };
}