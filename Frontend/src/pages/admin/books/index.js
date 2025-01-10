"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../../services/api");
var auth_1 = require("../../../utils/auth");
var ui_1 = require("../../../utils/ui");
var AdminBooksPage = /** @class */ (function () {
    function AdminBooksPage() {
        this.elements = {
            booksList: document.getElementById('booksList'),
            searchInput: document.getElementById('searchInput'),
            searchBtn: document.getElementById('searchBtn')
        };
        this.debounceTimeout = null;
        // Check admin authentication
        if (!(0, auth_1.requireAdmin)())
            return;
        this.setupEventListeners();
        this.loadBooks();
    }
    AdminBooksPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.elements.searchInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () { return _this.handleSearch(); });
        (_b = this.elements.searchBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.handleSearch(); });
        (_c = document.getElementById('addBookBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            window.location.href = '/pages/admin/books/add.html';
        });
        (_d = document.getElementById('logoutBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.handleLogout(); });
    };
    AdminBooksPage.prototype.handleSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.debounceTimeout) {
                    window.clearTimeout(this.debounceTimeout);
                }
                this.debounceTimeout = window.setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var query;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                query = ((_a = this.elements.searchInput) === null || _a === void 0 ? void 0 : _a.value) || '';
                                return [4 /*yield*/, this.loadBooks(query)];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 300);
                return [2 /*return*/];
            });
        });
    };
    AdminBooksPage.prototype.loadBooks = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var books, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.getBooks(search)];
                    case 1:
                        books = _a.sent();
                        this.renderBooks(books);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        (0, ui_1.showAlert)('Failed to load books', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminBooksPage.prototype.renderBooks = function (books) {
        if (!this.elements.booksList)
            return;
        this.elements.booksList.innerHTML = books.map(function (book) { return "\n            <div class=\"col-md-4 mb-4\">\n                <div class=\"card h-100\">\n                    <img src=\"".concat(book.coverImage || 'https://via.placeholder.com/150', "\" \n                         class=\"card-img-top\" \n                         alt=\"").concat(book.title, "\"\n                         style=\"height: 200px; object-fit: cover;\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">").concat(book.title, "</h5>\n                        <p class=\"card-text\">By ").concat(book.author, "</p>\n                        <p class=\"card-text\">\n                            <small class=\"text-muted\">\n                                ISBN: ").concat(book.isbn, "<br>\n                                Available: ").concat(book.available, "/").concat(book.quantity, "\n                            </small>\n                        </p>\n                        <div class=\"btn-group w-100\">\n                            <a href=\"/pages/admin/books/edit.html?id=").concat(book.id, "\" \n                               class=\"btn btn-dark\">Edit</a>\n                            <button class=\"btn btn-danger\" \n                                    onclick=\"window.adminBooksPage.handleDeleteBook('").concat(book.id, "')\">\n                                Delete\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "); }).join('');
    };
    AdminBooksPage.prototype.handleDeleteBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ui_1.showConfirm)('Are you sure you want to delete this book? This action cannot be undone.')];
                    case 1:
                        confirmed = _a.sent();
                        if (!confirmed)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, api_1.ApiService.deleteBook(bookId)];
                    case 3:
                        _a.sent();
                        (0, ui_1.showAlert)('Book deleted successfully', 'success');
                        return [4 /*yield*/, this.loadBooks()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        (0, ui_1.showAlert)('Failed to delete book', 'danger');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminBooksPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return AdminBooksPage;
}());
// Initialize the page and make it globally accessible for the delete button
var adminBooksPage = new AdminBooksPage();
window.adminBooksPage = adminBooksPage;
