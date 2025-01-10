import { ApiService } from '../../../services/api.js';
import { requireAdmin } from '../../../utils/auth.js';
import { formatDate, showAlert, showConfirm } from '../../../utils/ui.js';
class AdminUserDetailPage {
    userId = '';
    user = null;
    elements = {
        userName: document.getElementById('userName'),
        userEmail: document.getElementById('userEmail'),
        memberSince: document.getElementById('memberSince'),
        totalBorrowings: document.getElementById('totalBorrowings'),
        currentBorrowings: document.getElementById('currentBorrowings'),
        overdueBooks: document.getElementById('overdueBooks'),
        borrowingHistory: document.getElementById('borrowingHistory'),
        activityLog: document.getElementById('activityLog'),
        editUserBtn: document.getElementById('editUserBtn'),
        deactivateUserBtn: document.getElementById('deactivateUserBtn')
    };
    constructor() {
        // Check admin authentication
        if (!requireAdmin())
            return;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            window.location.href = '/pages/admin/users/index.html';
            return;
        }
        this.userId = id;
        this.setupEventListeners();
        this.loadUserData();
    }
    setupEventListeners() {
        this.elements.editUserBtn?.addEventListener('click', () => this.handleEditUser());
        this.elements.deactivateUserBtn?.addEventListener('click', () => this.handleDeactivateUser());
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async loadUserData() {
        try {
            this.user = await ApiService.getUser(this.userId);
            this.renderUserDetails();
            this.loadBorrowingHistory();
        }
        catch (error) {
            showAlert('Failed to load user details', 'danger');
        }
    }
    renderUserDetails() {
        if (!this.user)
            return;
        if (this.elements.userName) {
            this.elements.userName.textContent = this.user.username;
        }
        if (this.elements.userEmail) {
            this.elements.userEmail.textContent = this.user.email;
        }
        if (this.elements.memberSince) {
            this.elements.memberSince.textContent = formatDate(this.user.createdAt);
        }
    }
    async loadBorrowingHistory() {
        try {
            const borrowings = await ApiService.getUserBorrowings(this.userId);
            this.renderBorrowingHistory(borrowings);
            this.updateBorrowingStats(borrowings);
        }
        catch (error) {
            showAlert('Failed to load borrowing history', 'danger');
        }
    }
    renderBorrowingHistory(borrowings) {
        if (!this.elements.borrowingHistory)
            return;
        this.elements.borrowingHistory.innerHTML = borrowings.map(borrowing => `
            <tr>
                <td>${borrowing.book?.title || 'Unknown Book'}</td>
                <td>${formatDate(borrowing.borrowedDate)}</td>
                <td>${formatDate(borrowing.dueDate)}</td>
                <td>${borrowing.returnedDate ? formatDate(borrowing.returnedDate) : '-'}</td>
                <td>
                    <span class="badge bg-${this.getBorrowingStatusColor(borrowing.status)}">
                        ${borrowing.status}
                    </span>
                </td>
            </tr>
        `).join('');
    }
    updateBorrowingStats(borrowings) {
        const currentBorrowings = borrowings.filter(b => b.status === 'active').length;
        const overdueBorrowings = borrowings.filter(b => b.status === 'overdue').length;
        if (this.elements.totalBorrowings) {
            this.elements.totalBorrowings.textContent = borrowings.length.toString();
        }
        if (this.elements.currentBorrowings) {
            this.elements.currentBorrowings.textContent = currentBorrowings.toString();
        }
        if (this.elements.overdueBooks) {
            this.elements.overdueBooks.textContent = overdueBorrowings.toString();
        }
    }
    getBorrowingStatusColor(status) {
        switch (status) {
            case 'active': return 'primary';
            case 'returned': return 'success';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    }
    async handleEditUser() {
        if (!this.user)
            return;
        // Implement edit user functionality
        // This could open a modal or redirect to an edit page
    }
    async handleDeactivateUser() {
        if (!this.user)
            return;
        const confirmed = await showConfirm('Are you sure you want to deactivate this user? This action cannot be undone.');
        if (!confirmed)
            return;
        try {
            await ApiService.updateUser(this.userId, { status: 'inactive' });
            showAlert('User deactivated successfully', 'success');
            window.location.href = '/pages/admin/users/index.html';
        }
        catch (error) {
            showAlert('Failed to deactivate user', 'danger');
        }
    }
    handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}
// Initialize the page
new AdminUserDetailPage();
