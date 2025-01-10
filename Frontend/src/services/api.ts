import { ApiResponse, Book, Borrowing, LoginData, Notification, RegisterData, User } from '../types/models';

const API_URL = 'http://localhost:3000';

export interface DashboardStats {
    totalBooks: number;
    activeUsers: number;
    currentBorrowings: number;
    recentActivities: Array<{
        type: string;
        message: string;
        timestamp: string;
    }>;
    overdueBooks: Array<{
        bookTitle: string;
        borrowerName: string;
        dueDate: string;
    }>;
}

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

    private static async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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
        console.log("**************************************",data);

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    }

    // Auth endpoints
    static async login(data: LoginData): Promise<{ access_token: string }> {
        const response = await this.fetchApi<{ access_token: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.data!;
    }

    static async register(data: RegisterData): Promise<User> {
        const response = await this.fetchApi<User>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.data!;
    }

    // Books endpoints
    static async getBooks(search?: string): Promise<Book[]> {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await this.fetchApi<Book[]>(`/books${query}`);
        return response.data!;
    }

    static async getBook(id: string): Promise<Book> {
        const response = await this.fetchApi<Book>(`/books/${id}`);
        return response.data!;
    }

    static async addBook(book: Partial<Book>): Promise<Book> {
        const response = await this.fetchApi<Book>('/books', {
            method: 'POST',
            body: JSON.stringify(book)
        });
        return response.data!;
    }

    // Borrowing endpoints
    static async getBorrowings(): Promise<Borrowing[]> {
        const response = await this.fetchApi<Borrowing[]>('/borrowings');
        return response.data!;
    }

    static async getUserBorrowings(userId: string): Promise<Borrowing[]> {
        const response = await this.fetchApi<Borrowing[]>(`/admin/users/${userId}/borrowings`);
        return response.data!;
    }

    static async borrowBook(bookId: string): Promise<Borrowing> {
        const response = await this.fetchApi<Borrowing>('/borrowings', {
            method: 'POST',
            body: JSON.stringify({ bookId })
        });
        return response.data!;
    }

    static async returnBook(borrowingId: string): Promise<Borrowing> {
        const response = await this.fetchApi<Borrowing>(`/borrowings/${borrowingId}/return`, {
            method: 'POST'
        });
        return response.data!;
    }

    // User endpoints
    static async getCurrentUser(): Promise<User> {
        const response = await this.fetchApi<User>('/users/me');
        return response.data!;
    }

    static async updateProfile(data: Partial<User>): Promise<User> {
        const response = await this.fetchApi<User>('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return response.data!;
    }

    // Notification endpoints
    static async getNotifications(): Promise<Notification[]> {
        const response = await this.fetchApi<Notification[]>('/notifications');
        return response.data!;
    }

    static async markNotificationAsRead(id: string): Promise<void> {
        await this.fetchApi(`/notifications/${id}/read`, {
            method: 'POST'
        });
    }

    static async markAllNotificationsAsRead(): Promise<void> {
        await this.fetchApi('/notifications/read-all', {
            method: 'POST'
        });
    }

    // Admin endpoints
    static async getUsers(): Promise<User[]> {
        const response = await this.fetchApi<User[]>('/admin/users');
        return response.data!;
    }

    static async getUser(id: string): Promise<User> {
        const response = await this.fetchApi<User>(`/admin/users/${id}`);
        return response.data!;
    }

    static async updateUser(id: string, data: Partial<User> & { status?: 'active' | 'inactive' }): Promise<User> {
        const response = await this.fetchApi<User>(`/admin/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return response.data!;
    }

    static async getDashboardStats(): Promise<DashboardStats> {
        const response = await this.fetchApi<DashboardStats>('/admin/dashboard');
        return response.data!;
    }

    // Admin Book Management
    static async deleteBook(id: string): Promise<void> {
        await this.fetchApi(`/admin/books/${id}`, {
            method: 'DELETE'
        });
    }

    static async getAllBorrowings(): Promise<Borrowing[]> {
        const response = await this.fetchApi<Borrowing[]>('/admin/borrowings');
        return response.data!;
    }

    static async sendBorrowingReminder(borrowingId: string): Promise<void> {
        await this.fetchApi(`/admin/borrowings/${borrowingId}/remind`, {
            method: 'POST'
        });
    }
}
