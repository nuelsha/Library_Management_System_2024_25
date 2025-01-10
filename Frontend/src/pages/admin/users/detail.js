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
var AdminUserDetailPage = /** @class */ (function () {
    function AdminUserDetailPage() {
        this.userId = '';
        this.user = null;
        this.elements = {
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
        // Check admin authentication
        if (!(0, auth_1.requireAdmin)())
            return;
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('id');
        if (!id) {
            window.location.href = '/pages/admin/users/index.html';
            return;
        }
        this.userId = id;
        this.setupEventListeners();
        this.loadUserData();
    }
    AdminUserDetailPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c;
        (_a = this.elements.editUserBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.handleEditUser(); });
        (_b = this.elements.deactivateUserBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.handleDeactivateUser(); });
        (_c = document.getElementById('logoutBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.handleLogout(); });
    };
    AdminUserDetailPage.prototype.loadUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, api_1.ApiService.getUser(this.userId)];
                    case 1:
                        _a.user = _b.sent();
                        this.renderUserDetails();
                        this.loadBorrowingHistory();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        (0, ui_1.showAlert)('Failed to load user details', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminUserDetailPage.prototype.renderUserDetails = function () {
        if (!this.user)
            return;
        if (this.elements.userName) {
            this.elements.userName.textContent = this.user.username;
        }
        if (this.elements.userEmail) {
            this.elements.userEmail.textContent = this.user.email;
        }
        if (this.elements.memberSince) {
            this.elements.memberSince.textContent = (0, ui_1.formatDate)(this.user.createdAt);
        }
    };
    AdminUserDetailPage.prototype.loadBorrowingHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var borrowings, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.getUserBorrowings(this.userId)];
                    case 1:
                        borrowings = _a.sent();
                        this.renderBorrowingHistory(borrowings);
                        this.updateBorrowingStats(borrowings);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        (0, ui_1.showAlert)('Failed to load borrowing history', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminUserDetailPage.prototype.renderBorrowingHistory = function (borrowings) {
        var _this = this;
        if (!this.elements.borrowingHistory)
            return;
        this.elements.borrowingHistory.innerHTML = borrowings.map(function (borrowing) {
            var _a;
            return "\n            <tr>\n                <td>".concat(((_a = borrowing.book) === null || _a === void 0 ? void 0 : _a.title) || 'Unknown Book', "</td>\n                <td>").concat((0, ui_1.formatDate)(borrowing.borrowedDate), "</td>\n                <td>").concat((0, ui_1.formatDate)(borrowing.dueDate), "</td>\n                <td>").concat(borrowing.returnedDate ? (0, ui_1.formatDate)(borrowing.returnedDate) : '-', "</td>\n                <td>\n                    <span class=\"badge bg-").concat(_this.getBorrowingStatusColor(borrowing.status), "\">\n                        ").concat(borrowing.status, "\n                    </span>\n                </td>\n            </tr>\n        ");
        }).join('');
    };
    AdminUserDetailPage.prototype.updateBorrowingStats = function (borrowings) {
        var currentBorrowings = borrowings.filter(function (b) { return b.status === 'active'; }).length;
        var overdueBorrowings = borrowings.filter(function (b) { return b.status === 'overdue'; }).length;
        if (this.elements.totalBorrowings) {
            this.elements.totalBorrowings.textContent = borrowings.length.toString();
        }
        if (this.elements.currentBorrowings) {
            this.elements.currentBorrowings.textContent = currentBorrowings.toString();
        }
        if (this.elements.overdueBooks) {
            this.elements.overdueBooks.textContent = overdueBorrowings.toString();
        }
    };
    AdminUserDetailPage.prototype.getBorrowingStatusColor = function (status) {
        switch (status) {
            case 'active': return 'primary';
            case 'returned': return 'success';
            case 'overdue': return 'danger';
            default: return 'secondary';
        }
    };
    AdminUserDetailPage.prototype.handleEditUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.user)
                    return [2 /*return*/];
                return [2 /*return*/];
            });
        });
    };
    AdminUserDetailPage.prototype.handleDeactivateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.user)
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, ui_1.showConfirm)('Are you sure you want to deactivate this user? This action cannot be undone.')];
                    case 1:
                        confirmed = _a.sent();
                        if (!confirmed)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, api_1.ApiService.updateUser(this.userId, { status: 'inactive' })];
                    case 3:
                        _a.sent();
                        (0, ui_1.showAlert)('User deactivated successfully', 'success');
                        window.location.href = '/pages/admin/users/index.html';
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        (0, ui_1.showAlert)('Failed to deactivate user', 'danger');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminUserDetailPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return AdminUserDetailPage;
}());
// Initialize the page
new AdminUserDetailPage();
