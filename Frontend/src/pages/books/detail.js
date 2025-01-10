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
var api_1 = require("../../services/api");
var auth_1 = require("../../utils/auth");
var ui_1 = require("../../utils/ui");
var BookDetailPage = /** @class */ (function () {
    function BookDetailPage() {
        this.bookId = '';
        this.book = null;
        // Check authentication
        if (!(0, auth_1.requireAuth)())
            return;
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('id');
        if (!id) {
            window.location.href = '/pages/books/index.html';
            return;
        }
        this.bookId = id;
        this.setupEventListeners();
        this.loadBook();
    }
    BookDetailPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b;
        (_a = document.getElementById('borrowBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.handleBorrow(); });
        (_b = document.getElementById('logoutBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.handleLogout(); });
    };
    BookDetailPage.prototype.loadBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, api_1.ApiService.getBook(this.bookId)];
                    case 1:
                        _a.book = _b.sent();
                        this.renderBook();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        (0, ui_1.showAlert)('Failed to load book details', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookDetailPage.prototype.renderBook = function () {
        if (!this.book)
            return;
        var elements = {
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
            elements.author.textContent = "By ".concat(this.book.author);
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
    };
    BookDetailPage.prototype.handleBorrow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.book)
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, ui_1.showConfirm)('Do you want to borrow this book?')];
                    case 1:
                        confirmed = _a.sent();
                        if (!confirmed)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, api_1.ApiService.borrowBook(this.book.id)];
                    case 3:
                        _a.sent();
                        (0, ui_1.showAlert)('Book borrowed successfully!', 'success');
                        return [4 /*yield*/, this.loadBook()];
                    case 4:
                        _a.sent(); // Reload book details
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        (0, ui_1.showAlert)(error_2 instanceof Error ? error_2.message : 'Failed to borrow book', 'danger');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BookDetailPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return BookDetailPage;
}());
// Initialize the page
new BookDetailPage();
