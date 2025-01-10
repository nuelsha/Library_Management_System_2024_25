export declare const Routes: {
    AUTH: {
        LOGIN: string;
        SIGNUP: string;
    };
    USER: {
        BOOKS: {
            LIST: string;
            DETAIL: (id: string) => string;
        };
        BORROWING: {
            LIST: string;
            ACTIVE: string;
            HISTORY: string;
        };
        PROFILE: {
            VIEW: string;
            SETTINGS: string;
        };
        NOTIFICATIONS: string;
    };
    ADMIN: {
        DASHBOARD: string;
        BOOKS: {
            LIST: string;
            ADD: string;
            EDIT: (id: string) => string;
        };
        USERS: {
            LIST: string;
            DETAIL: (id: string) => string;
        };
        BORROWINGS: {
            LIST: string;
            OVERDUE: string;
        };
    };
};
export declare function navigateTo(path: string): void;
export declare function redirectToHome(): void;
export declare function getQueryParam(param: string): string | null;
export declare function buildQueryString(params: Record<string, string>): string;
export declare function updateQueryParams(params: Record<string, string>): void;
export declare function getPathSegments(): string[];
export declare function isAdminRoute(): boolean;
export declare function getCurrentRoute(): string;
export declare function goBack(): void;
