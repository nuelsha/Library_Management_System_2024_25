import { isAdmin } from './auth';
export const Routes = {
    // Authentication
    AUTH: {
        LOGIN: '/pages/auth/login.html',
        SIGNUP: '/pages/auth/signup.html'
    },
    // User Routes
    USER: {
        BOOKS: {
            LIST: '/pages/books/index.html',
            DETAIL: (id) => `/pages/books/detail.html?id=${id}`
        },
        BORROWING: {
            LIST: '/pages/borrowing/index.html',
            ACTIVE: '/pages/borrowing/active.html',
            HISTORY: '/pages/borrowing/history.html'
        },
        PROFILE: {
            VIEW: '/pages/user/profile.html',
            SETTINGS: '/pages/user/settings.html'
        },
        NOTIFICATIONS: '/pages/notifications/index.html'
    },
    // Admin Routes
    ADMIN: {
        DASHBOARD: '/pages/admin/dashboard.html',
        BOOKS: {
            LIST: '/pages/admin/books/index.html',
            ADD: '/pages/admin/books/add.html',
            EDIT: (id) => `/pages/admin/books/edit.html?id=${id}`
        },
        USERS: {
            LIST: '/pages/admin/users/index.html',
            DETAIL: (id) => `/pages/admin/users/detail.html?id=${id}`
        },
        BORROWINGS: {
            LIST: '/pages/admin/borrowings/index.html',
            OVERDUE: '/pages/admin/borrowings/overdue.html'
        }
    }
};
export function navigateTo(path) {
    window.location.href = path;
}
export function redirectToHome() {
    navigateTo(isAdmin() ? Routes.ADMIN.DASHBOARD : Routes.USER.BOOKS.LIST);
}
export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
export function buildQueryString(params) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value)
            urlParams.append(key, value);
    });
    const queryString = urlParams.toString();
    return queryString ? `?${queryString}` : '';
}
export function updateQueryParams(params) {
    const newUrl = `${window.location.pathname}${buildQueryString(params)}`;
    window.history.pushState({}, '', newUrl);
}
export function getPathSegments() {
    return window.location.pathname.split('/').filter(Boolean);
}
export function isAdminRoute() {
    const segments = getPathSegments();
    return segments.includes('admin');
}
export function getCurrentRoute() {
    return window.location.pathname;
}
export function goBack() {
    window.history.back();
}
