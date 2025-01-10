"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNavigation = setupNavigation;
var auth_1 = require("./auth");
var routes_1 = require("./routes");
function setupNavigation() {
    var currentPath = window.location.pathname;
    // Check authentication for protected routes
    if (!isPublicRoute(currentPath)) {
        if (!(0, auth_1.isAuthenticated)()) {
            window.location.href = routes_1.Routes.AUTH.LOGIN;
            return;
        }
        // Check admin access for admin routes
        if (isAdminRoute(currentPath) && !(0, auth_1.isAdmin)()) {
            window.location.href = routes_1.Routes.USER.BOOKS.LIST;
            return;
        }
    }
    setupActiveNavLinks();
    setupLogoutButton();
}
function isPublicRoute(path) {
    var publicRoutes = [
        routes_1.Routes.AUTH.LOGIN,
        routes_1.Routes.AUTH.SIGNUP
    ];
    return publicRoutes.includes(path);
}
function isAdminRoute(path) {
    return path.includes('/admin/');
}
function setupActiveNavLinks() {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(function (link) {
        var href = link.href;
        if (href === window.location.origin + currentPath) {
            link.classList.add('active');
        }
        else {
            link.classList.remove('active');
        }
    });
}
function setupLogoutButton() {
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = routes_1.Routes.AUTH.LOGIN;
        });
    }
}
// Call setupNavigation when the page loads
document.addEventListener('DOMContentLoaded', setupNavigation);
