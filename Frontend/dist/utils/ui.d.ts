export declare function showAlert(message: string, type?: 'success' | 'danger' | 'warning' | 'info'): void;
export declare function showConfirm(message: string): Promise<boolean>;
export declare function formatDate(date: Date | string): string;
export declare function formatDateTime(date: Date | string): string;
export declare function setLoading(loading: boolean): void;
