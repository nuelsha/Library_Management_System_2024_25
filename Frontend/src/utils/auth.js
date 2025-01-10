"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.getCurrentUser = getCurrentUser;
exports.setCurrentUser = setCurrentUser;
exports.clearCurrentUser = clearCurrentUser;
exports.redirectToLogin = redirectToLogin;
exports.redirectToDashboard = redirectToDashboard;
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
var api_1 = require("../services/api");
function isAuthenticated() {
    return !!api_1.ApiService.getToken();
}
function isAdmin() {
    var user = getCurrentUser();
    return (user === null || user === void 0 ? void 0 : user.role) === 'admin';
}
function getCurrentUser() {
    var userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
}
function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
function clearCurrentUser() {
    localStorage.removeItem('user');
}
function redirectToLogin() {
    window.location.href = '/pages/auth/login.html';
}
function redirectToDashboard() {
    var user = getCurrentUser();
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        window.location.href = '/pages/admin/dashboard.html';
    }
    else {
        window.location.href = '/pages/books/index.html';
    }
}
function requireAuth() {
    if (!isAuthenticated()) {
        redirectToLogin();
        return false;
    }
    return true;
}
function requireAdmin() {
    if (!requireAuth())
        return false;
    if (!isAdmin()) {
        redirectToDashboard();
        return false;
    }
    return true;
}
