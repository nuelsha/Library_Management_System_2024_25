export interface User {
    username: string;
    email: string;
    role: string;
    createdAt: Date;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    available: boolean;
    coverImage?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
