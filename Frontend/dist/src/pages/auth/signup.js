import { ApiService } from '../../services/api.js.js.js.js';
import { showAlert } from '../../utils/ui.js.js.js.js';
class SignupPage {
    form;
    constructor() {
        this.form = document.getElementById('signupForm');
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    async handleSubmit(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }
        try {
            const registerData = {
                username: fullName,
                email,
                password
            };
            await ApiService.register(registerData);
            console.log("i am test log **************************");
            showAlert('Registration successful! Please log in.', 'success');
            window.location.href = '/pages/auth/login.html';
        }
        catch (error) {
            showAlert(error instanceof Error ? error.message : 'Registration failed', 'danger');
        }
    }
}
// Initialize the page
new SignupPage();
