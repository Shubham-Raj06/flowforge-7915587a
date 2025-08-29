```javascript
/**
 * Portfolio Website - Modern JavaScript
 */

// Smooth Scroll to Section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - (document.querySelector('header')?.offsetHeight || 0), // Account for fixed header
        behavior: 'smooth'
      });

      // Optionally close the mobile menu after navigation
      if (document.body.classList.contains('mobile-menu-active')) {
        toggleMobileMenu(); // Assuming you have a toggleMobileMenu function
      }
    }
  });
});

// Interactive Elements (Example: Card Hover Effect)
const cards = document.querySelectorAll('.card'); // Replace with your card selector

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('card-hovered');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('card-hovered');
  });
});

// Form Validation (Example: Contact Form)
const contactForm = document.getElementById('contact-form'); // Replace with your form ID

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Simple validation examples (expand as needed)
    if (!name) {
      isValid = false;
      alert('Please enter your name.');
    }

    if (!email) {
      isValid = false;
      alert('Please enter your email.');
    } else if (!isValidEmail(email)) {
      isValid = false;
      alert('Please enter a valid email address.');
    }

    if (!message) {
      isValid = false;
      alert('Please enter your message.');
    }

    if (isValid) {
      // Simulate form submission (replace with actual AJAX request)
      console.log('Form submitted:', { name, email, message });
      alert('Form submitted successfully!'); // Replace with a better success message

      // Clear the form
      contactForm.reset();
    }
  });

  // Helper function for email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Mobile Menu Functionality
const menuButton = document.querySelector('.menu-button'); // Replace with your menu button selector
const mobileMenu = document.querySelector('.mobile-menu'); // Replace with your mobile menu selector

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
    document.body.classList.toggle('mobile-menu-active'); // Add class to body for better control
    menuButton.classList.toggle('menu-button-active'); // Toggle state of the button (e.g. change icon)
    mobileMenu.classList.toggle('mobile-menu-open'); //Toggle state of the menu itself
  }
}

// Example of Intersection Observer (Lazy Loading Images)
const imagesToLoad = document.querySelectorAll('img[data-src]'); // Select images with data-src attribute

const imgOptions = {
    threshold: 0.2, //Load when 20% of image is visible
    rootMargin: "0px 0px 50px 0px" //load 50px before reaching the bottom of the image
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if(item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    }, imgOptions);

    imagesToLoad.forEach((img) => {
        imgObserver.observe(img);
    });
} else {
    //Fallback for browsers that don't support IntersectionObserver
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

// Example: Dynamic Year in Footer
const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Debounce function (for event listeners that trigger frequently)
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }

// Example Usage (Debouncing a window resize event)
window.addEventListener('resize', debounce(() => {
    // Perform actions that should only happen after resizing stops
    console.log('Window resized (debounced)');
  }, 250)); // Delay of 250ms
```