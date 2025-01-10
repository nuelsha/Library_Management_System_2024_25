"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var auth_1 = require("../utils/auth");
var routes_1 = require("../utils/routes");
var Layout = /** @class */ (function () {
    function Layout() {
    }
    Layout.init = function () {
        this.renderNavbar();
        this.setupEventListeners();
    };
    Layout.renderNavbar = function () {
        var user = (0, auth_1.getCurrentUser)();
        var isAdminUser = (0, auth_1.isAdmin)();
        var navbar = document.getElementById('navbar');
        if (!navbar)
            return;
        navbar.innerHTML = "\n            <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n                <div class=\"container\">\n                    <a class=\"navbar-brand\" href=\"".concat(isAdminUser ? routes_1.Routes.ADMIN.DASHBOARD : routes_1.Routes.USER.BOOKS.LIST, "\">\n                        Library Management System\n                    </a>\n                    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarNav\">\n                        <span class=\"navbar-toggler-icon\"></span>\n                    </button>\n                    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n                        ").concat(user ? this.getAuthenticatedMenu(isAdminUser) : this.getPublicMenu(), "\n                    </div>\n                </div>\n            </nav>\n        ");
    };
    Layout.getAuthenticatedMenu = function (isAdminUser) {
        if (isAdminUser) {
            return "\n                <ul class=\"navbar-nav me-auto\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"".concat(routes_1.Routes.ADMIN.DASHBOARD, "\">Dashboard</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"").concat(routes_1.Routes.ADMIN.BOOKS.LIST, "\">Books</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"").concat(routes_1.Routes.ADMIN.USERS.LIST, "\">Users</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"").concat(routes_1.Routes.ADMIN.BORROWINGS.LIST, "\">Borrowings</a>\n                    </li>\n                </ul>\n                <ul class=\"navbar-nav\">\n                    <li class=\"nav-item dropdown\">\n                        <a class=\"nav-link dropdown-toggle\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\">\n                            Admin Menu\n                        </a>\n                        <ul class=\"dropdown-menu dropdown-menu-end\">\n                            <li><a class=\"dropdown-item\" href=\"").concat(routes_1.Routes.USER.PROFILE.VIEW, "\">Profile</a></li>\n                            <li><hr class=\"dropdown-divider\"></li>\n                            <li><a class=\"dropdown-item\" href=\"#\" id=\"logoutBtn\">Logout</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            ");
        }
        return "\n            <ul class=\"navbar-nav me-auto\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"".concat(routes_1.Routes.USER.BOOKS.LIST, "\">Books</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"").concat(routes_1.Routes.USER.BORROWING.LIST, "\">My Borrowings</a>\n                </li>\n            </ul>\n            <ul class=\"navbar-nav\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link position-relative\" href=\"").concat(routes_1.Routes.USER.NOTIFICATIONS, "\">\n                        Notifications\n                        <span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\" id=\"notificationBadge\">\n                            0\n                        </span>\n                    </a>\n                </li>\n                <li class=\"nav-item dropdown\">\n                    <a class=\"nav-link dropdown-toggle\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\">\n                        My Account\n                    </a>\n                    <ul class=\"dropdown-menu dropdown-menu-end\">\n                        <li><a class=\"dropdown-item\" href=\"").concat(routes_1.Routes.USER.PROFILE.VIEW, "\">Profile</a></li>\n                        <li><a class=\"dropdown-item\" href=\"").concat(routes_1.Routes.USER.PROFILE.SETTINGS, "\">Settings</a></li>\n                        <li><hr class=\"dropdown-divider\"></li>\n                        <li><a class=\"dropdown-item\" href=\"#\" id=\"logoutBtn\">Logout</a></li>\n                    </ul>\n                </li>\n            </ul>\n        ");
    };
    Layout.getPublicMenu = function () {
        return "\n            <ul class=\"navbar-nav ms-auto\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"".concat(routes_1.Routes.AUTH.LOGIN, "\">Login</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"").concat(routes_1.Routes.AUTH.SIGNUP, "\">Sign Up</a>\n                </li>\n            </ul>\n        ");
    };
    Layout.setupEventListeners = function () {
        var _this = this;
        var _a;
        (_a = document.getElementById('logoutBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            e.preventDefault();
            _this.handleLogout();
        });
    };
    Layout.handleLogout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = routes_1.Routes.AUTH.LOGIN;
    };
    Layout.updateNotificationBadge = function (count) {
        var badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = count.toString();
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    };
    return Layout;
}());
exports.Layout = Layout;
// Initialize layout when the page loads
document.addEventListener('DOMContentLoaded', function () { return Layout.init(); });
