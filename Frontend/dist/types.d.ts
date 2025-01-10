export interface User {
    username: string;
    email: string;
    role: string;
    createdAt: Date;
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
