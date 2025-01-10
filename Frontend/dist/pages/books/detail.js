import { ApiService } from '../../services/api.js';
import { requireAuth } from '../../utils/auth.js';
import { showAlert, showConfirm } from '../../utils/ui.js';
class BookDetailPage {
    bookId = '';
    book = null;
    constructor() {
        // Check authentication
        if (!requireAuth())
            return;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            window.location.href = '/pages/books/index.html';
            return;
        }
        this.bookId = id;
        this.setupEventListeners();
        this.loadBook();
    }
    setupEventListeners() {
        document.getElementById('borrowBtn')?.addEventListener('click', () => this.handleBorrow());
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
    }
    async loadBook() {
        try {
            this.book = await ApiService.getBook(this.bookId);
            this.renderBook();
        }
        catch (error) {
            showAlert('Failed to load book details', 'danger');
        }
    }
    renderBook() {
        if (!this.book)
            return;
        const elements = {
            title: document.getElementById('bookTitle'),
            author: document.getElementById('bookAuthor'),
            isbn: document.getElementById('bookISBN'),
            status: document.getElementById('bookStatus'),
            description: document.getElementById('bookDescription'),
            cover: document.getElementById('bookCover'),
            borrowBtn: document.getElementById('borrowBtn')
        };
        if (elements.title)
            elements.title.textContent = this.book.title;
        if (elements.author)
            elements.author.textContent = `By ${this.book.author}`;
        if (elements.isbn)
            elements.isbn.textContent = this.book.isbn;
        if (elements.status)
            elements.status.textContent =
                this.book.available > 0 ? 'Available' : 'Not Available';
        if (elements.description)
            elements.description.textContent = this.book.description;
        if (elements.cover) {
            elements.cover.src = this.book.coverImage || 'https://via.placeholder.com/300';
            elements.cover.alt = this.book.title;
        }
        if (elements.borrowBtn) {
            elements.borrowBtn.disabled = this.book.available === 0;
        }
    }
    async handleBorrow() {
        if (!this.book)
            return;
        const confirmed = await showConfirm('Do you want to borrow this book?');
        if (!confirmed)
            return;
        try {
            await ApiService.borrowBook(this.book.id);
            showAlert('Book borrowed successfully!', 'success');
            await this.loadBook(); // Reload book details
        }
        catch (error) {
            showAlert(error instanceof Error ? error.message : 'Failed to borrow book', 'danger');
        }
    }
    handleLogout() {
        ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    }
}
// Initialize the page
new BookDetailPage();
