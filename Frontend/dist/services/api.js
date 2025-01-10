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
        const data = await response.json();
        console.log("**************************************", data);
        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }
        return data;
    }
    // Auth endpoints
    static async login(data) {
        const response = await this.fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.data;
    }
    static async register(data) {
        const response = await this.fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.data;
    }
    // Books endpoints
    static async getBooks(search) {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await this.fetchApi(`/books${query}`);
        return response.data;
    }
    static async getBook(id) {
        const response = await this.fetchApi(`/books/${id}`);
        return response.data;
    }
    static async addBook(book) {
        const response = await this.fetchApi('/books', {
            method: 'POST',
            body: JSON.stringify(book)
        });
        return response.data;
    }
    // Borrowing endpoints
    static async getBorrowings() {
        const response = await this.fetchApi('/borrowings');
        return response.data;
    }
    static async getUserBorrowings(userId) {
        const response = await this.fetchApi(`/admin/users/${userId}/borrowings`);
        return response.data;
    }
    static async borrowBook(bookId) {
        const response = await this.fetchApi('/borrowings', {
            method: 'POST',
            body: JSON.stringify({ bookId })
        });
        return response.data;
    }
    static async returnBook(borrowingId) {
        const response = await this.fetchApi(`/borrowings/${borrowingId}/return`, {
            method: 'POST'
        });
        return response.data;
    }
    // User endpoints
    static async getCurrentUser() {
        const response = await this.fetchApi('/users/me');
        return response.data;
    }
    static async updateProfile(data) {
        const response = await this.fetchApi('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return response.data;
    }
    // Notification endpoints
    static async getNotifications() {
        const response = await this.fetchApi('/notifications');
        return response.data;
    }
    static async markNotificationAsRead(id) {
        await this.fetchApi(`/notifications/${id}/read`, {
            method: 'POST'
        });
    }
    static async markAllNotificationsAsRead() {
        await this.fetchApi('/notifications/read-all', {
            method: 'POST'
        });
    }
    // Admin endpoints
    static async getUsers() {
        const response = await this.fetchApi('/admin/users');
        return response.data;
    }
    static async getUser(id) {
        const response = await this.fetchApi(`/admin/users/${id}`);
        return response.data;
    }
    static async updateUser(id, data) {
        const response = await this.fetchApi(`/admin/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return response.data;
    }
    static async getDashboardStats() {
        const response = await this.fetchApi('/admin/dashboard');
        return response.data;
    }
    // Admin Book Management
    static async deleteBook(id) {
        await this.fetchApi(`/admin/books/${id}`, {
            method: 'DELETE'
        });
    }
    static async getAllBorrowings() {
        const response = await this.fetchApi('/admin/borrowings');
        return response.data;
    }
    static async sendBorrowingReminder(borrowingId) {
        await this.fetchApi(`/admin/borrowings/${borrowingId}/remind`, {
            method: 'POST'
        });
    }
}
