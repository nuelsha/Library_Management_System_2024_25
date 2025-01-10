import { ApiService } from '../../services/api.js';
import { redirectToDashboard, setCurrentUser } from '../../utils/auth.js';
import { showAlert } from '../../utils/ui.js';
class LoginPage {
    form;
    constructor() {
        this.form = document.getElementById('loginForm');
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    async handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const loginData = { email, password };
            const { access_token } = await ApiService.login(loginData);
            ApiService.setToken(access_token);
            // Get user details
            const user = await ApiService.getCurrentUser();
            setCurrentUser(user);
            showAlert('Login successful!', 'success');
            redirectToDashboard();
        }
        catch (error) {
            showAlert(error instanceof Error ? error.message : 'Login failed', 'danger');
        }
    }
}
// Initialize the page
new LoginPage();
