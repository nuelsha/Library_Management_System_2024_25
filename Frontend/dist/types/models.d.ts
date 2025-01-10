export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
}
export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    coverImage: string;
    quantity: number;
    available: number;
    createdAt: Date;
}
export interface Borrowing {
    id: string;
    userId: string;
    bookId: string;
    borrowedDate: Date;
    dueDate: Date;
    returnedDate?: Date;
    status: 'active' | 'returned' | 'overdue';
    book?: Book;
    user?: User;
}
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'danger';
    read: boolean;
    createdAt: Date;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
