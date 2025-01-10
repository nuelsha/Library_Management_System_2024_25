import { ApiService } from '../../../services/api';
import { Book } from '../../../types/models';
import { requireAdmin } from '../../../utils/auth';
import { formatDate, showAlert, showConfirm } from '../../../utils/ui';

class AdminBooksPage {
    private elements = {
        booksList: document.getElementById('booksList'),
        searchInput: document.getElementById('searchInput') as HTMLInputElement | null,
        searchBtn: document.getElementById('searchBtn')
    };

    private debounceTimeout: number | null = null;

    constructor() {
        // Check admin authentication
        if (!requireAdmin()) return;

        this.setupEventListeners();
        this.loadBooks();
    }

    private setupEventListeners() {
        this.elements.searchInput?.addEventListener('input', () => this.handleSearch());
        this.elements.searchBtn?.addEventListener('click', () => this.handleSearch());
        document.getElementById('addBookBtn')?.addEventListener('click', () => {
            window.location.href = '/pages/admin/books/add.html';
        });
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }

    private async handleSearch() {
        if (this.debounceTimeout) {
            window.clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = window.setTimeout(async () => {
            const query = this.elements.searchInput?.value || '';
            await this.loadBooks(query);
        }, 300);
    }

    private async loadBooks(search?: string) {
        try {
            const books = await ApiService.getBooks(search);
            this.renderBooks(books);
        } catch (error) {
            showAlert('Failed to load books', 'danger');
        }
    }

    private renderBooks(books: Book[]) {
        if (!this.elements.booksList) return;

        this.elements.booksList.innerHTML = books.map(book => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${book.coverImage || 'https://via.placeholder.com/150'}" 
                         class="card-img-top" 
                         alt="${book.title}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">By ${book.author}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                ISBN: ${book.isbn}<br>
                                Available: ${book.available}/${book.quantity}
                            </small>
                        </p>
                        <div class="btn-group w-100">
                            <a href="/pages/admin/books/edit.html?id=${book.id}" 
                               class="btn btn-dark">Edit</a>
                            <button class="btn btn-danger" 
                                    onclick="window.adminBooksPage.handleDeleteBook('${book.id}')">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    private async handleDeleteBook(bookId: string) {
        const confirmed = await showConfirm(
            'Are you sure you want to delete this book? This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            await ApiService.deleteBook(bookId);
            showAlert('Book deleted successfully', 'success');
            await this.loadBooks();
        } catch (error) {
            showAlert('Failed to delete book', 'danger');
        }
    }

    private handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}

// Initialize the page and make it globally accessible for the delete button
const adminBooksPage = new AdminBooksPage();
(window as any).adminBooksPage = adminBooksPage;
