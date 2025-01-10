import { Book, Borrowing, LoginData, Notification, RegisterData, User } from '../types/models';
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
export declare class ApiService {
    private static token;
    static setToken(token: string): void;
    static getToken(): string | null;
    static clearToken(): void;
    private static fetchApi;
    static login(data: LoginData): Promise<{
        access_token: string;
    }>;
    static register(data: RegisterData): Promise<User>;
    static getBooks(search?: string): Promise<Book[]>;
    static getBook(id: string): Promise<Book>;
    static addBook(book: Partial<Book>): Promise<Book>;
    static getBorrowings(): Promise<Borrowing[]>;
    static getUserBorrowings(userId: string): Promise<Borrowing[]>;
    static borrowBook(bookId: string): Promise<Borrowing>;
    static returnBook(borrowingId: string): Promise<Borrowing>;
    static getCurrentUser(): Promise<User>;
    static updateProfile(data: Partial<User>): Promise<User>;
    static getNotifications(): Promise<Notification[]>;
    static markNotificationAsRead(id: string): Promise<void>;
    static markAllNotificationsAsRead(): Promise<void>;
    static getUsers(): Promise<User[]>;
    static getUser(id: string): Promise<User>;
    static updateUser(id: string, data: Partial<User> & {
        status?: 'active' | 'inactive';
    }): Promise<User>;
    static getDashboardStats(): Promise<DashboardStats>;
    static deleteBook(id: string): Promise<void>;
    static getAllBorrowings(): Promise<Borrowing[]>;
    static sendBorrowingReminder(borrowingId: string): Promise<void>;
}
