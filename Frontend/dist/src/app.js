import { ApiService } from './api';
class App {
    constructor() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    setupEventListeners() {
        // Form submissions
        document.getElementById('loginFormElement')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerFormElement')?.addEventListener('submit', (e) => this.handleRegister(e));
        // Navigation between forms
        document.getElementById('showRegister')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleForms('register');
        });
        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleForms('login');
        });
    }
    toggleForms(show) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (show === 'login') {
            loginForm?.classList.remove('d-none');
            registerForm?.classList.add('d-none');
        }
        else {
            loginForm?.classList.add('d-none');
            registerForm?.classList.remove('d-none');
        }
    }
    checkAuthStatus() {
        const token = ApiService.getToken();
        if (token) {
            this.showMainContent();
        }
    }
    showMainContent() {
        document.getElementById('loginForm')?.classList.add('d-none');
        document.getElementById('registerForm')?.classList.add('d-none');
        document.getElementById('mainContent')?.classList.remove('d-none');
    }
    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            await ApiService.login({ username: email, password }); // Using email as username
            this.showAlert('Login successful!', 'success');
            this.showMainContent();
        }
        catch (error) {
            this.showAlert('Login failed. Please check your credentials and try again.', 'danger');
        }
    }
    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            this.showAlert('Passwords do not match.', 'danger');
            return;
        }
        try {
            await ApiService.register({ username: name, email, password });
            this.showAlert('Registration successful! Please log in.', 'success');
            this.toggleForms('login');
        }
        catch (error) {
            this.showAlert('Registration failed. Please try again.', 'danger');
        }
    }
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}
// Initialize the app
new App();
