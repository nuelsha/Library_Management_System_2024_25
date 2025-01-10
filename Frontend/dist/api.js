const API_URL = 'http://localhost:3000';
export class ApiService {
    static token = null;
    static setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }
    static getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }
    static clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }
    static async fetchApi(endpoint, options = {}) {
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
    static async login(data) {
        const response = await this.fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        this.setToken(response.access_token);
        return response;
    }
    static async register(data) {
        return this.fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
