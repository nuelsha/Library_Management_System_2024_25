import { ApiService } from '../../../services/api.js';
import { requireAdmin } from '../../../utils/auth.js';
import { formatDate, showAlert } from '../../../utils/ui.js';
class AdminUsersPage {
    elements = {
        usersList: document.getElementById('usersList'),
        searchInput: document.getElementById('searchInput'),
        filterSelect: document.getElementById('filterSelect')
    };
    currentFilter = 'all';
    searchQuery = '';
    constructor() {
        // Check admin authentication
        if (!requireAdmin())
            return;
        this.setupEventListeners();
        this.loadUsers();
    }
    setupEventListeners() {
        this.elements.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.loadUsers();
        });
        this.elements.filterSelect?.addEventListener('change', () => {
            this.currentFilter = this.elements.filterSelect?.value || 'all';
            this.loadUsers();
        });
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async loadUsers() {
        try {
            const users = await ApiService.getUsers();
            const filteredUsers = this.filterUsers(users);
            this.renderUsers(filteredUsers);
        }
        catch (error) {
            showAlert('Failed to load users', 'danger');
        }
    }
    filterUsers(users) {
        return users
            .filter(user => {
            if (this.currentFilter === 'all')
                return true;
            return user.role === this.currentFilter;
        })
            .filter(user => {
            if (!this.searchQuery)
                return true;
            const searchLower = this.searchQuery.toLowerCase();
            return (user.username.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower));
        });
    }
    renderUsers(users) {
        if (!this.elements.usersList)
            return;
        this.elements.usersList.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="https://via.placeholder.com/40" 
                             class="rounded-circle me-2" 
                             alt="${user.username}">
                        <div>
                            <div class="fw-bold">${user.username}</div>
                            <div class="small text-muted">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-${user.role === 'admin' ? 'dark' : 'primary'}">
                        ${user.role}
                    </span>
                </td>
                <td>${formatDate(user.createdAt)}</td>
                <td>
                    <div class="btn-group">
                        <a href="/pages/admin/users/detail.html?id=${user.id}" 
                           class="btn btn-sm btn-dark">View Details</a>
                        <button class="btn btn-sm btn-outline-dark dropdown-toggle" 
                                data-bs-toggle="dropdown">
                            Actions
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#"
                                   onclick="window.adminUsersPage.handlePromoteUser('${user.id}')">
                                    Promote to Admin
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item text-danger" href="#"
                                   onclick="window.adminUsersPage.handleDeactivateUser('${user.id}')">
                                    Deactivate User
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    async handlePromoteUser(userId) {
        try {
            await ApiService.updateUser(userId, { role: 'admin' });
            showAlert('User promoted to admin successfully', 'success');
            await this.loadUsers();
        }
        catch (error) {
            showAlert('Failed to promote user', 'danger');
        }
    }
    async handleDeactivateUser(userId) {
        try {
            await ApiService.updateUser(userId, { status: 'inactive' });
            showAlert('User deactivated successfully', 'success');
            await this.loadUsers();
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
// Initialize the page and make it globally accessible for action buttons
const adminUsersPage = new AdminUsersPage();
window.adminUsersPage = adminUsersPage;
