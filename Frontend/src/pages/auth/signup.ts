import { ApiService } from '../../services/api';
import { RegisterData } from '../../types/models';
import { redirectToDashboard } from '../../utils/auth';
import { showAlert } from '../../utils/ui';

class SignupPage {
    private form: HTMLFormElement;

    constructor() {
        this.form = document.getElementById('signupForm') as HTMLFormElement;
        this.setupEventListeners();
    }

    private setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    private async handleSubmit(e: Event) {
        e.preventDefault();

        const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }

        try {
            const registerData: RegisterData = {
                username: fullName,
                email,
                password
            };

            console.log("i am test log **************************");
            await ApiService.register(registerData);
            showAlert('Registration successful! Please log in.', 'success');
            window.location.href = '/pages/auth/login.html';
        } catch (error) {
            showAlert(error instanceof Error ? error.message : 'Registration failed', 'danger');
        }
    }
}

// Initialize the page
new SignupPage();
