// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');

// Form switching functionality
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchToRegister();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchToLogin();
});

function switchToRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    registerForm.classList.add('visible');
    // Clear any previous errors
    clearAllErrors();
}

function switchToLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginForm.classList.add('visible');
    // Clear any previous errors
    clearAllErrors();
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('error');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    inputElement.classList.remove('error');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('input');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    inputElements.forEach(input => {
        input.classList.remove('error');
    });
}

// Login form validation
function validateLoginForm() {
    let isValid = true;
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Clear previous errors
    clearError('loginEmailError');
    clearError('loginPasswordError');

    // Validate email
    if (!email) {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

// Register form validation
function validateRegisterForm() {
    let isValid = true;
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Clear previous errors
    clearError('registerNameError');
    clearError('registerEmailError');
    clearError('registerPasswordError');
    clearError('confirmPasswordError');

    // Validate name
    if (!name) {
        showError('registerNameError', 'Full name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('registerNameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('registerEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('registerEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('registerPasswordError', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('registerPasswordError', 'Password must be at least 8 characters with uppercase, lowercase, and number');
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms agreement
    if (!agreeTerms) {
        alert('Please agree to the Terms and Conditions');
        isValid = false;
    }

    return isValid;
}

// Form submission handlers
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
        // Simulate login process
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        console.log('Login attempt:', { email, password });
        
        // Show success message (in a real app, this would be handled by the server)
        alert('Login successful! (This is a demo)');

        // Hide login/register forms and show main page
        window.location.href = 'main.html';
        
        // Reset form
        loginFormElement.reset();
        clearAllErrors();
    }
});

registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
        // Simulate registration process
        const formData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value
        };
        
        console.log('Registration attempt:', formData);
        
        // Show success message and switch to login
        alert('Registration successful! Please sign in with your new account.');
        
        // Reset form and switch to login
        registerFormElement.reset();
        clearAllErrors();
        switchToLogin();
    }
});

// Real-time validation for better UX
document.getElementById('loginEmail').addEventListener('blur', () => {
    const email = document.getElementById('loginEmail').value.trim();
    if (email && !validateEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
    } else {
        clearError('loginEmailError');
    }
});

document.getElementById('registerEmail').addEventListener('blur', () => {
    const email = document.getElementById('registerEmail').value.trim();
    if (email && !validateEmail(email)) {
        showError('registerEmailError', 'Please enter a valid email address');
    } else {
        clearError('registerEmailError');
    }
});

document.getElementById('registerPassword').addEventListener('blur', () => {
    const password = document.getElementById('registerPassword').value;
    if (password && !validatePassword(password)) {
        showError('registerPasswordError', 'Password must be at least 8 characters with uppercase, lowercase, and number');
    } else {
        clearError('registerPasswordError');
    }
});

document.getElementById('confirmPassword').addEventListener('blur', () => {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword && password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
    } else {
        clearError('confirmPasswordError');
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    loginForm.classList.add('visible');
    
    // Add some demo data for testing (remove in production)
    console.log('Login/Register page loaded successfully!');
    console.log('Demo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: Demo123');
});
