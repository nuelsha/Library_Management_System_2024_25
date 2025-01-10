export declare function isAuthenticated(): boolean;
export declare function isAdmin(): boolean;
export declare function getCurrentUser(): any;
export declare function setCurrentUser(user: any): void;
export declare function clearCurrentUser(): void;
export declare function redirectToLogin(): void;
export declare function redirectToDashboard(): void;
export declare function requireAuth(): boolean;
export declare function requireAdmin(): boolean;
