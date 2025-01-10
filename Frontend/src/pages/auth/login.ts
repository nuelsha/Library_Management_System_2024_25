import { ApiService } from '../../services/api';
import { LoginData } from '../../types/models';
import { redirectToDashboard, setCurrentUser } from '../../utils/auth';
import { showAlert } from '../../utils/ui';

class LoginPage {
    private form: HTMLFormElement;

    constructor() {
        this.form = document.getElementById('loginForm') as HTMLFormElement;
        this.setupEventListeners();
    }

    private setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    private async handleSubmit(e: Event) {
        e.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const loginData: LoginData = { email, password };
            const { access_token } = await ApiService.login(loginData);
            
            ApiService.setToken(access_token);
            
            // Get user details
            const user = await ApiService.getCurrentUser();
            setCurrentUser(user);

            showAlert('Login successful!', 'success');
            redirectToDashboard();
        } catch (error) {
            showAlert(error instanceof Error ? error.message : 'Login failed', 'danger');
        }
    }
}

// Initialize the page
new LoginPage();
