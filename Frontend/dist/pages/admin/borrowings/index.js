import { ApiService } from '../../../services/api.js';
import { requireAdmin } from '../../../utils/auth.js';
import { formatDate, showAlert, showConfirm } from '../../../utils/ui.js';
class AdminBorrowingsPage {
    elements = {
        borrowingsList: document.getElementById('borrowingsList'),
        filterSelect: document.getElementById('filterSelect'),
        searchInput: document.getElementById('searchInput')
    };
    currentFilter = 'all';
    searchQuery = '';
    constructor() {
        // Check admin authentication
        if (!requireAdmin())
            return;
        this.setupEventListeners();
        this.loadBorrowings();
    }
    setupEventListeners() {
        this.elements.filterSelect?.addEventListener('change', () => {
            this.currentFilter = this.elements.filterSelect?.value || 'all';
            this.loadBorrowings();
        });
        this.elements.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.loadBorrowings();
        });
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async loadBorrowings() {
        try {
            const borrowings = await ApiService.getAllBorrowings();
            const filteredBorrowings = this.filterBorrowings(borrowings);
            this.renderBorrowings(filteredBorrowings);
        }
        catch (error) {
            showAlert('Failed to load borrowings', 'danger');
        }
    }
    filterBorrowings(borrowings) {
        return borrowings
            .filter(borrowing => {
            if (this.currentFilter === 'all')
                return true;
            return borrowing.status === this.currentFilter;
        })
            .filter(borrowing => {
            if (!this.searchQuery)
                return true;
            const searchLower = this.searchQuery.toLowerCase();
            return (borrowing.book?.title.toLowerCase().includes(searchLower) ||
                borrowing.user?.username.toLowerCase().includes(searchLower));
        });
    }
    renderBorrowings(borrowings) {
        if (!this.elements.borrowingsList)
            return;
        this.elements.borrowingsList.innerHTML = borrowings.map(borrowing => `
            <tr>
                <td>${borrowing.book?.title || 'Unknown Book'}</td>
                <td>${borrowing.user?.username || 'Unknown User'}</td>
                <td>${formatDate(borrowing.borrowedDate)}</td>
                <td>${formatDate(borrowing.dueDate)}</td>
                <td>${borrowing.returnedDate ? formatDate(borrowing.returnedDate) : '-'}</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(borrowing.status)}">
                        ${borrowing.status}
                    </span>
                </td>
                <td>
                    ${this.renderActions(borrowing)}
                </td>
            </tr>
        `).join('');
    }
    getStatusColor(status) {
        switch (status) {
            case 'active': return 'primary';
            case 'returned': return 'success';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    }
    renderActions(borrowing) {
        if (borrowing.status === 'returned') {
            return '<span class="text-muted">No actions available</span>';
        }
        return `
            <button class="btn btn-sm btn-success me-2" 
                    onclick="window.adminBorrowingsPage.handleReturn('${borrowing.id}')">
                Mark as Returned
            </button>
            ${borrowing.status === 'overdue' ? `
                <button class="btn btn-sm btn-warning" 
                        onclick="window.adminBorrowingsPage.handleSendReminder('${borrowing.id}')">
                    Send Reminder
                </button>
            ` : ''}
        `;
    }
    async handleReturn(borrowingId) {
        const confirmed = await showConfirm('Are you sure you want to mark this book as returned?');
        if (!confirmed)
            return;
        try {
            await ApiService.returnBook(borrowingId);
            showAlert('Book marked as returned successfully', 'success');
            await this.loadBorrowings();
        }
        catch (error) {
            showAlert('Failed to mark book as returned', 'danger');
        }
    }
    async handleSendReminder(borrowingId) {
        try {
            await ApiService.sendBorrowingReminder(borrowingId);
            showAlert('Reminder sent successfully', 'success');
        }
        catch (error) {
            showAlert('Failed to send reminder', 'danger');
        }
    }
    handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}
// Initialize the page and make it globally accessible for the action buttons
const adminBorrowingsPage = new AdminBorrowingsPage();
window.adminBorrowingsPage = adminBorrowingsPage;
