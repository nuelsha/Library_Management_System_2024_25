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
var AdminUsersPage = /** @class */ (function () {
    function AdminUsersPage() {
        this.elements = {
            usersList: document.getElementById('usersList'),
            searchInput: document.getElementById('searchInput'),
            filterSelect: document.getElementById('filterSelect')
        };
        this.currentFilter = 'all';
        this.searchQuery = '';
        // Check admin authentication
        if (!(0, auth_1.requireAdmin)())
            return;
        this.setupEventListeners();
        this.loadUsers();
    }
    AdminUsersPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c;
        (_a = this.elements.searchInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
            _this.searchQuery = e.target.value;
            _this.loadUsers();
        });
        (_b = this.elements.filterSelect) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function () {
            var _a;
            _this.currentFilter = ((_a = _this.elements.filterSelect) === null || _a === void 0 ? void 0 : _a.value) || 'all';
            _this.loadUsers();
        });
        (_c = document.getElementById('logoutBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.handleLogout(); });
    };
    AdminUsersPage.prototype.loadUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, filteredUsers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.getUsers()];
                    case 1:
                        users = _a.sent();
                        filteredUsers = this.filterUsers(users);
                        this.renderUsers(filteredUsers);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        (0, ui_1.showAlert)('Failed to load users', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminUsersPage.prototype.filterUsers = function (users) {
        var _this = this;
        return users
            .filter(function (user) {
            if (_this.currentFilter === 'all')
                return true;
            return user.role === _this.currentFilter;
        })
            .filter(function (user) {
            if (!_this.searchQuery)
                return true;
            var searchLower = _this.searchQuery.toLowerCase();
            return (user.username.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower));
        });
    };
    AdminUsersPage.prototype.renderUsers = function (users) {
        if (!this.elements.usersList)
            return;
        this.elements.usersList.innerHTML = users.map(function (user) { return "\n            <tr>\n                <td>\n                    <div class=\"d-flex align-items-center\">\n                        <img src=\"https://via.placeholder.com/40\" \n                             class=\"rounded-circle me-2\" \n                             alt=\"".concat(user.username, "\">\n                        <div>\n                            <div class=\"fw-bold\">").concat(user.username, "</div>\n                            <div class=\"small text-muted\">").concat(user.email, "</div>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class=\"badge bg-").concat(user.role === 'admin' ? 'dark' : 'primary', "\">\n                        ").concat(user.role, "\n                    </span>\n                </td>\n                <td>").concat((0, ui_1.formatDate)(user.createdAt), "</td>\n                <td>\n                    <div class=\"btn-group\">\n                        <a href=\"/pages/admin/users/detail.html?id=").concat(user.id, "\" \n                           class=\"btn btn-sm btn-dark\">View Details</a>\n                        <button class=\"btn btn-sm btn-outline-dark dropdown-toggle\" \n                                data-bs-toggle=\"dropdown\">\n                            Actions\n                        </button>\n                        <ul class=\"dropdown-menu\">\n                            <li>\n                                <a class=\"dropdown-item\" href=\"#\"\n                                   onclick=\"window.adminUsersPage.handlePromoteUser('").concat(user.id, "')\">\n                                    Promote to Admin\n                                </a>\n                            </li>\n                            <li>\n                                <a class=\"dropdown-item text-danger\" href=\"#\"\n                                   onclick=\"window.adminUsersPage.handleDeactivateUser('").concat(user.id, "')\">\n                                    Deactivate User\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                </td>\n            </tr>\n        "); }).join('');
    };
    AdminUsersPage.prototype.handlePromoteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, api_1.ApiService.updateUser(userId, { role: 'admin' })];
                    case 1:
                        _a.sent();
                        (0, ui_1.showAlert)('User promoted to admin successfully', 'success');
                        return [4 /*yield*/, this.loadUsers()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        (0, ui_1.showAlert)('Failed to promote user', 'danger');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminUsersPage.prototype.handleDeactivateUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, api_1.ApiService.updateUser(userId, { status: 'inactive' })];
                    case 1:
                        _a.sent();
                        (0, ui_1.showAlert)('User deactivated successfully', 'success');
                        return [4 /*yield*/, this.loadUsers()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        (0, ui_1.showAlert)('Failed to deactivate user', 'danger');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminUsersPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return AdminUsersPage;
}());
// Initialize the page and make it globally accessible for action buttons
var adminUsersPage = new AdminUsersPage();
window.adminUsersPage = adminUsersPage;
