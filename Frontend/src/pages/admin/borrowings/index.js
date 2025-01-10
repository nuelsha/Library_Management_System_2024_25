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
var AdminBorrowingsPage = /** @class */ (function () {
    function AdminBorrowingsPage() {
        this.elements = {
            borrowingsList: document.getElementById('borrowingsList'),
            filterSelect: document.getElementById('filterSelect'),
            searchInput: document.getElementById('searchInput')
        };
        this.currentFilter = 'all';
        this.searchQuery = '';
        // Check admin authentication
        if (!(0, auth_1.requireAdmin)())
            return;
        this.setupEventListeners();
        this.loadBorrowings();
    }
    AdminBorrowingsPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c;
        (_a = this.elements.filterSelect) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
            var _a;
            _this.currentFilter = ((_a = _this.elements.filterSelect) === null || _a === void 0 ? void 0 : _a.value) || 'all';
            _this.loadBorrowings();
        });
        (_b = this.elements.searchInput) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function (e) {
            _this.searchQuery = e.target.value;
            _this.loadBorrowings();
        });
        (_c = document.getElementById('logoutBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.handleLogout(); });
    };
    AdminBorrowingsPage.prototype.loadBorrowings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var borrowings, filteredBorrowings, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.getAllBorrowings()];
                    case 1:
                        borrowings = _a.sent();
                        filteredBorrowings = this.filterBorrowings(borrowings);
                        this.renderBorrowings(filteredBorrowings);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        (0, ui_1.showAlert)('Failed to load borrowings', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminBorrowingsPage.prototype.filterBorrowings = function (borrowings) {
        var _this = this;
        return borrowings
            .filter(function (borrowing) {
            if (_this.currentFilter === 'all')
                return true;
            return borrowing.status === _this.currentFilter;
        })
            .filter(function (borrowing) {
            var _a, _b;
            if (!_this.searchQuery)
                return true;
            var searchLower = _this.searchQuery.toLowerCase();
            return (((_a = borrowing.book) === null || _a === void 0 ? void 0 : _a.title.toLowerCase().includes(searchLower)) ||
                ((_b = borrowing.user) === null || _b === void 0 ? void 0 : _b.username.toLowerCase().includes(searchLower)));
        });
    };
    AdminBorrowingsPage.prototype.renderBorrowings = function (borrowings) {
        var _this = this;
        if (!this.elements.borrowingsList)
            return;
        this.elements.borrowingsList.innerHTML = borrowings.map(function (borrowing) {
            var _a, _b;
            return "\n            <tr>\n                <td>".concat(((_a = borrowing.book) === null || _a === void 0 ? void 0 : _a.title) || 'Unknown Book', "</td>\n                <td>").concat(((_b = borrowing.user) === null || _b === void 0 ? void 0 : _b.username) || 'Unknown User', "</td>\n                <td>").concat((0, ui_1.formatDate)(borrowing.borrowedDate), "</td>\n                <td>").concat((0, ui_1.formatDate)(borrowing.dueDate), "</td>\n                <td>").concat(borrowing.returnedDate ? (0, ui_1.formatDate)(borrowing.returnedDate) : '-', "</td>\n                <td>\n                    <span class=\"badge bg-").concat(_this.getStatusColor(borrowing.status), "\">\n                        ").concat(borrowing.status, "\n                    </span>\n                </td>\n                <td>\n                    ").concat(_this.renderActions(borrowing), "\n                </td>\n            </tr>\n        ");
        }).join('');
    };
    AdminBorrowingsPage.prototype.getStatusColor = function (status) {
        switch (status) {
            case 'active': return 'primary';
            case 'returned': return 'success';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    };
    AdminBorrowingsPage.prototype.renderActions = function (borrowing) {
        if (borrowing.status === 'returned') {
            return '<span class="text-muted">No actions available</span>';
        }
        return "\n            <button class=\"btn btn-sm btn-success me-2\" \n                    onclick=\"window.adminBorrowingsPage.handleReturn('".concat(borrowing.id, "')\">\n                Mark as Returned\n            </button>\n            ").concat(borrowing.status === 'overdue' ? "\n                <button class=\"btn btn-sm btn-warning\" \n                        onclick=\"window.adminBorrowingsPage.handleSendReminder('".concat(borrowing.id, "')\">\n                    Send Reminder\n                </button>\n            ") : '', "\n        ");
    };
    AdminBorrowingsPage.prototype.handleReturn = function (borrowingId) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ui_1.showConfirm)('Are you sure you want to mark this book as returned?')];
                    case 1:
                        confirmed = _a.sent();
                        if (!confirmed)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, api_1.ApiService.returnBook(borrowingId)];
                    case 3:
                        _a.sent();
                        (0, ui_1.showAlert)('Book marked as returned successfully', 'success');
                        return [4 /*yield*/, this.loadBorrowings()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        (0, ui_1.showAlert)('Failed to mark book as returned', 'danger');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminBorrowingsPage.prototype.handleSendReminder = function (borrowingId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.sendBorrowingReminder(borrowingId)];
                    case 1:
                        _a.sent();
                        (0, ui_1.showAlert)('Reminder sent successfully', 'success');
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        (0, ui_1.showAlert)('Failed to send reminder', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminBorrowingsPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return AdminBorrowingsPage;
}());
// Initialize the page and make it globally accessible for the action buttons
var adminBorrowingsPage = new AdminBorrowingsPage();
window.adminBorrowingsPage = adminBorrowingsPage;
