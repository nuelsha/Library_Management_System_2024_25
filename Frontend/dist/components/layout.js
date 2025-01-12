import { getCurrentUser, isAdmin } from '../utils/auth';
import { Routes } from '../utils/routes';
export class Layout {
    static init() {
        this.renderNavbar();
        this.setupEventListeners();
    }
    static renderNavbar() {
        const user = getCurrentUser();
        const isAdminUser = isAdmin();
        const navbar = document.getElementById('navbar');
        if (!navbar)
            return;
        navbar.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="${isAdminUser ? Routes.ADMIN.DASHBOARD : Routes.USER.BOOKS.LIST}">
                        Library Management System
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        ${user ? this.getAuthenticatedMenu(isAdminUser) : this.getPublicMenu()}
                    </div>
                </div>
            </nav>
        `;
    }
    static getAuthenticatedMenu(isAdminUser) {
        if (isAdminUser) {
            return `
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="${Routes.ADMIN.DASHBOARD}">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${Routes.ADMIN.BOOKS.LIST}">Books</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${Routes.ADMIN.USERS.LIST}">Users</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${Routes.ADMIN.BORROWINGS.LIST}">Borrowings</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Admin Menu
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="${Routes.USER.PROFILE.VIEW}">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            `;
        }
        return `
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${Routes.USER.BOOKS.LIST}">Books</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${Routes.USER.BORROWING.LIST}">My Borrowings</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link position-relative" href="${Routes.USER.NOTIFICATIONS}">
                        Notifications
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="notificationBadge">
                            0
                        </span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        My Account
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="${Routes.USER.PROFILE.VIEW}">Profile</a></li>
                        <li><a class="dropdown-item" href="${Routes.USER.PROFILE.SETTINGS}">Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                    </ul>
                </li>
            </ul>
        `;
    }
    static getPublicMenu() {
        return `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${Routes.AUTH.LOGIN}">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${Routes.AUTH.SIGNUP}">Sign Up</a>
                </li>
            </ul>
        `;
    }
    static setupEventListeners() {
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }
    static handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = Routes.AUTH.LOGIN;
    }
    static updateNotificationBadge(count) {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = count.toString();
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }
}
// Initialize layout when the page loads
document.addEventListener('DOMContentLoaded', () => Layout.init());
