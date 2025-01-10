import { ApiService } from '../../services/api.js.js.js.js';
import { requireAuth } from '../../utils/auth.js.js.js.js';
import { showAlert } from '../../utils/ui.js.js.js.js';
class BooksPage {
    searchInput = null;
    searchBtn = null;
    booksList = null;
    debounceTimeout = null;
    constructor() {
        // Check authentication
        if (!requireAuth())
            return;
        const searchInputElement = document.getElementById('searchInput');
        const searchBtnElement = document.getElementById('searchBtn');
        const booksListElement = document.getElementById('booksList');
        if (!searchInputElement || !searchBtnElement || !booksListElement) {
            throw new Error('Required elements not found');
        }
        this.searchInput = searchInputElement;
        this.searchBtn = searchBtnElement;
        this.booksList = booksListElement;
        this.setupEventListeners();
        this.loadBooks();
    }
    setupEventListeners() {
        this.searchInput?.addEventListener('input', () => this.handleSearch());
        this.searchBtn?.addEventListener('click', () => this.handleSearch());
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async handleSearch() {
        if (this.debounceTimeout) {
            window.clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = window.setTimeout(async () => {
            const query = this.searchInput?.value;
            await this.loadBooks(query);
        }, 300);
    }
    async loadBooks(search) {
        try {
            const books = await ApiService.getBooks(search);
            this.renderBooks(books);
        }
        catch (error) {
            showAlert('Failed to load books', 'danger');
        }
    }
    renderBooks(books) {
        if (!this.booksList)
            return;
        this.booksList.innerHTML = books.map(book => `
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
                        <a href="/pages/books/detail.html?id=${book.id}" 
                           class="btn btn-dark">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}
// Initialize the page
new BooksPage();
