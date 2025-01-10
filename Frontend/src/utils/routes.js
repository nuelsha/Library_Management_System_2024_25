"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
exports.navigateTo = navigateTo;
exports.redirectToHome = redirectToHome;
exports.getQueryParam = getQueryParam;
exports.buildQueryString = buildQueryString;
exports.updateQueryParams = updateQueryParams;
exports.getPathSegments = getPathSegments;
exports.isAdminRoute = isAdminRoute;
exports.getCurrentRoute = getCurrentRoute;
exports.goBack = goBack;
var auth_1 = require("./auth");
exports.Routes = {
    // Authentication
    AUTH: {
        LOGIN: '/pages/auth/login.html',
        SIGNUP: '/pages/auth/signup.html'
    },
    // User Routes
    USER: {
        BOOKS: {
            LIST: '/pages/books/index.html',
            DETAIL: function (id) { return "/pages/books/detail.html?id=".concat(id); }
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
            EDIT: function (id) { return "/pages/admin/books/edit.html?id=".concat(id); }
        },
        USERS: {
            LIST: '/pages/admin/users/index.html',
            DETAIL: function (id) { return "/pages/admin/users/detail.html?id=".concat(id); }
        },
        BORROWINGS: {
            LIST: '/pages/admin/borrowings/index.html',
            OVERDUE: '/pages/admin/borrowings/overdue.html'
        }
    }
};
function navigateTo(path) {
    window.location.href = path;
}
function redirectToHome() {
    navigateTo((0, auth_1.isAdmin)() ? exports.Routes.ADMIN.DASHBOARD : exports.Routes.USER.BOOKS.LIST);
}
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function buildQueryString(params) {
    var urlParams = new URLSearchParams();
    Object.entries(params).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value)
            urlParams.append(key, value);
    });
    var queryString = urlParams.toString();
    return queryString ? "?".concat(queryString) : '';
}
function updateQueryParams(params) {
    var newUrl = "".concat(window.location.pathname).concat(buildQueryString(params));
    window.history.pushState({}, '', newUrl);
}
function getPathSegments() {
    return window.location.pathname.split('/').filter(Boolean);
}
function isAdminRoute() {
    var segments = getPathSegments();
    return segments.includes('admin');
}
function getCurrentRoute() {
    return window.location.pathname;
}
function goBack() {
    window.history.back();
}
