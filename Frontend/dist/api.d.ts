import { LoginData, RegisterData, User } from './types';
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
}
