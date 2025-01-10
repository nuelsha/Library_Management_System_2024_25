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
var AdminDashboardPage = /** @class */ (function () {
    function AdminDashboardPage() {
        this.elements = {
            totalBooks: document.getElementById('totalBooks'),
            activeUsers: document.getElementById('activeUsers'),
            currentBorrowings: document.getElementById('currentBorrowings'),
            recentActivities: document.getElementById('recentActivities'),
            overdueBooks: document.getElementById('overdueBooks')
        };
        // Check admin authentication
        if (!(0, auth_1.requireAdmin)())
            return;
        this.setupEventListeners();
        this.loadDashboardData();
    }
    AdminDashboardPage.prototype.setupEventListeners = function () {
        var _this = this;
        var _a;
        (_a = document.getElementById('logoutBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.handleLogout(); });
    };
    AdminDashboardPage.prototype.loadDashboardData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.ApiService.getDashboardStats()];
                    case 1:
                        stats = _a.sent();
                        this.renderStats(stats);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        (0, ui_1.showAlert)('Failed to load dashboard data', 'danger');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminDashboardPage.prototype.renderStats = function (stats) {
        // Update statistics
        if (this.elements.totalBooks) {
            this.elements.totalBooks.textContent = stats.totalBooks.toString();
        }
        if (this.elements.activeUsers) {
            this.elements.activeUsers.textContent = stats.activeUsers.toString();
        }
        if (this.elements.currentBorrowings) {
            this.elements.currentBorrowings.textContent = stats.currentBorrowings.toString();
        }
        // Render recent activities
        if (this.elements.recentActivities) {
            this.elements.recentActivities.innerHTML = stats.recentActivities
                .map(function (activity) { return "\n                    <div class=\"list-group-item\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h6 class=\"mb-1\">".concat(activity.type, "</h6>\n                            <small>").concat((0, ui_1.formatDate)(activity.timestamp), "</small>\n                        </div>\n                        <p class=\"mb-1\">").concat(activity.message, "</p>\n                    </div>\n                "); }).join('');
        }
        // Render overdue books
        if (this.elements.overdueBooks) {
            this.elements.overdueBooks.innerHTML = stats.overdueBooks
                .map(function (book) { return "\n                    <div class=\"list-group-item\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h6 class=\"mb-1\">".concat(book.bookTitle, "</h6>\n                            <small class=\"text-danger\">Due: ").concat((0, ui_1.formatDate)(book.dueDate), "</small>\n                        </div>\n                        <p class=\"mb-1\">Borrowed by: ").concat(book.borrowerName, "</p>\n                    </div>\n                "); }).join('');
        }
    };
    AdminDashboardPage.prototype.handleLogout = function () {
        api_1.ApiService.clearToken();
        window.location.href = '/pages/auth/login.html';
    };
    return AdminDashboardPage;
}());
// Initialize the page
new AdminDashboardPage();
