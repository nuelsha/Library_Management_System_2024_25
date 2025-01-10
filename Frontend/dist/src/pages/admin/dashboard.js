import { ApiService } from '../../services/api.js.js.js.js';
import { requireAdmin } from '../../utils/auth.js.js.js.js';
import { formatDate, showAlert } from '../../utils/ui.js.js.js.js';
class AdminDashboardPage {
    elements = {
        totalBooks: document.getElementById('totalBooks'),
        activeUsers: document.getElementById('activeUsers'),
        currentBorrowings: document.getElementById('currentBorrowings'),
        recentActivities: document.getElementById('recentActivities'),
        overdueBooks: document.getElementById('overdueBooks')
    };
    constructor() {
        // Check admin authentication
        if (!requireAdmin())
            return;
        this.setupEventListeners();
        this.loadDashboardData();
    }
    setupEventListeners() {
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async loadDashboardData() {
        try {
            const stats = await ApiService.getDashboardStats();
            this.renderStats(stats);
        }
        catch (error) {
            showAlert('Failed to load dashboard data', 'danger');
        }
    }
    renderStats(stats) {
        // Update statistics
        if (this.elements.totalBooks) {
            this.elements.totalBooks.textContent = stats.totalBooks.toString();
        }
        if (this.elements.activeUsers) {
            this.elements.activeUsers.textContent = stats.activeUsers.toString();
        }
        if (this.elements.currentBorrowings) {
            this.elements.currentBorrowings.textContent = stats.currentBorrowings.toString();
        }
        // Render recent activities
        if (this.elements.recentActivities) {
            this.elements.recentActivities.innerHTML = stats.recentActivities
                .map(activity => `
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${activity.type}</h6>
                            <small>${formatDate(activity.timestamp)}</small>
                        </div>
                        <p class="mb-1">${activity.message}</p>
                    </div>
                `).join('');
        }
        // Render overdue books
        if (this.elements.overdueBooks) {
            this.elements.overdueBooks.innerHTML = stats.overdueBooks
                .map(book => `
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${book.bookTitle}</h6>
                            <small class="text-danger">Due: ${formatDate(book.dueDate)}</small>
                        </div>
                        <p class="mb-1">Borrowed by: ${book.borrowerName}</p>
                    </div>
                `).join('');
        }
    }
    handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}
// Initialize the page
new AdminDashboardPage();
