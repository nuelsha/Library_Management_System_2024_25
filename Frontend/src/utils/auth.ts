import { ApiService } from '../services/api';

export function isAuthenticated(): boolean {
    return !!ApiService.getToken();
}

export function isAdmin(): boolean {
    const user = getCurrentUser();
    return user?.role === 'admin';
}

export function getCurrentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
}

export function setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearCurrentUser() {
    localStorage.removeItem('user');
}

export function redirectToLogin() {
    window.location.href = '/pages/auth/login.html';
}

export function redirectToDashboard() {
    const user = getCurrentUser();
    if (user?.role === 'admin') {
        window.location.href = '/pages/admin/dashboard.html';
    } else {
        window.location.href = '/pages/books/index.html';
    }
}

export function requireAuth() {
    if (!isAuthenticated()) {
        redirectToLogin();
        return false;
    }
    return true;
}

export function requireAdmin() {
    if (!requireAuth()) return false;
    if (!isAdmin()) {
        redirectToDashboard();
        return false;
    }
    return true;
}
