import { ApiService } from '../../../services/api';
import { Borrowing } from '../../../types/models';
import { requireAdmin } from '../../../utils/auth';
import { formatDate, showAlert, showConfirm } from '../../../utils/ui';

class AdminBorrowingsPage {
    private elements = {
        borrowingsList: document.getElementById('borrowingsList'),
        filterSelect: document.getElementById('filterSelect') as HTMLSelectElement | null,
        searchInput: document.getElementById('searchInput') as HTMLInputElement | null
    };

    private currentFilter: string = 'all';
    private searchQuery: string = '';

    constructor() {
        // Check admin authentication
        if (!requireAdmin()) return;

        this.setupEventListeners();
        this.loadBorrowings();
    }

    private setupEventListeners() {
        this.elements.filterSelect?.addEventListener('change', () => {
            this.currentFilter = this.elements.filterSelect?.value || 'all';
            this.loadBorrowings();
        });

        this.elements.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value;
            this.loadBorrowings();
        });

        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }

    private async loadBorrowings() {
        try {
            const borrowings = await ApiService.getAllBorrowings();
            const filteredBorrowings = this.filterBorrowings(borrowings);
            this.renderBorrowings(filteredBorrowings);
        } catch (error) {
            showAlert('Failed to load borrowings', 'danger');
        }
    }

    private filterBorrowings(borrowings: Borrowing[]): Borrowing[] {
        return borrowings
            .filter(borrowing => {
                if (this.currentFilter === 'all') return true;
                return borrowing.status === this.currentFilter;
            })
            .filter(borrowing => {
                if (!this.searchQuery) return true;
                const searchLower = this.searchQuery.toLowerCase();
                return (
                    borrowing.book?.title.toLowerCase().includes(searchLower) ||
                    borrowing.user?.username.toLowerCase().includes(searchLower)
                );
            });
    }

    private renderBorrowings(borrowings: Borrowing[]) {
        if (!this.elements.borrowingsList) return;

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

    private getStatusColor(status: string): string {
        switch (status) {
            case 'active': return 'primary';
            case 'returned': return 'success';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    }

    private renderActions(borrowing: Borrowing): string {
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

    private async handleReturn(borrowingId: string) {
        const confirmed = await showConfirm('Are you sure you want to mark this book as returned?');
        if (!confirmed) return;

        try {
            await ApiService.returnBook(borrowingId);
            showAlert('Book marked as returned successfully', 'success');
            await this.loadBorrowings();
        } catch (error) {
            showAlert('Failed to mark book as returned', 'danger');
        }
    }

    private async handleSendReminder(borrowingId: string) {
        try {
            await ApiService.sendBorrowingReminder(borrowingId);
            showAlert('Reminder sent successfully', 'success');
        } catch (error) {
            showAlert('Failed to send reminder', 'danger');
        }
    }

    private handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}

// Initialize the page and make it globally accessible for the action buttons
const adminBorrowingsPage = new AdminBorrowingsPage();
(window as any).adminBorrowingsPage = adminBorrowingsPage;
