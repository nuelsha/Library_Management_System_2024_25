import { isAdmin, isAuthenticated } from './auth';
import { Routes } from './routes';

export function setupNavigation() {
    const currentPath = window.location.pathname;

    // Check authentication for protected routes
    if (!isPublicRoute(currentPath)) {
        if (!isAuthenticated()) {
            window.location.href = Routes.AUTH.LOGIN;
            return;
        }

        // Check admin access for admin routes
        if (isAdminRoute(currentPath) && !isAdmin()) {
            window.location.href = Routes.USER.BOOKS.LIST;
            return;
        }
    }

    setupActiveNavLinks();
    setupLogoutButton();
}

function isPublicRoute(path: string): boolean {
    const publicRoutes = [
        Routes.AUTH.LOGIN,
        Routes.AUTH.SIGNUP
    ];
    return publicRoutes.includes(path);
}

function isAdminRoute(path: string): boolean {
    return path.includes('/admin/');
}

function setupActiveNavLinks() {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = (link as HTMLAnchorElement).href;
        if (href === window.location.origin + currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = Routes.AUTH.LOGIN;
        });
    }
}

// Call setupNavigation when the page loads
document.addEventListener('DOMContentLoaded', setupNavigation);
