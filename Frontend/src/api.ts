import { LoginData, RegisterData, User } from './types';

const API_URL = 'http://localhost:3000';

export class ApiService {
    private static token: string | null = null;

    static setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    static getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    static clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    private static async fetchApi(endpoint: string, options: RequestInit = {}) {
        const token = this.getToken();
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async login(data: LoginData): Promise<{ access_token: string }> {
        const response = await this.fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        this.setToken(response.access_token);
        return response;
    }

    static async register(data: RegisterData): Promise<User> {
        return this.fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
