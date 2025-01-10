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
var api_1 = require("./api");
var App = /** @class */ (function () {
    function App() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    App.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        // Form submissions
        (_a = document.getElementById('loginFormElement')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) { return _this.handleLogin(e); });
        (_b = document.getElementById('registerFormElement')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (e) { return _this.handleRegister(e); });
        // Navigation between forms
        (_c = document.getElementById('showRegister')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (e) {
            e.preventDefault();
            _this.toggleForms('register');
        });
        (_d = document.getElementById('showLogin')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function (e) {
            e.preventDefault();
            _this.toggleForms('login');
        });
    };
    App.prototype.toggleForms = function (show) {
        var loginForm = document.getElementById('loginForm');
        var registerForm = document.getElementById('registerForm');
        if (show === 'login') {
            loginForm === null || loginForm === void 0 ? void 0 : loginForm.classList.remove('d-none');
            registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.add('d-none');
        }
        else {
            loginForm === null || loginForm === void 0 ? void 0 : loginForm.classList.add('d-none');
            registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.remove('d-none');
        }
    };
    App.prototype.checkAuthStatus = function () {
        var token = api_1.ApiService.getToken();
        if (token) {
            this.showMainContent();
        }
    };
    App.prototype.showMainContent = function () {
        var _a, _b, _c;
        (_a = document.getElementById('loginForm')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
        (_b = document.getElementById('registerForm')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
        (_c = document.getElementById('mainContent')) === null || _c === void 0 ? void 0 : _c.classList.remove('d-none');
    };
    App.prototype.handleLogin = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        email = document.getElementById('loginEmail').value;
                        password = document.getElementById('loginPassword').value;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.ApiService.login({ username: email, password: password })];
                    case 2:
                        _a.sent(); // Using email as username
                        this.showAlert('Login successful!', 'success');
                        this.showMainContent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.showAlert('Login failed. Please check your credentials and try again.', 'danger');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.handleRegister = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, password, confirmPassword, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        name = document.getElementById('registerName').value;
                        email = document.getElementById('registerEmail').value;
                        password = document.getElementById('registerPassword').value;
                        confirmPassword = document.getElementById('confirmPassword').value;
                        if (password !== confirmPassword) {
                            this.showAlert('Passwords do not match.', 'danger');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.ApiService.register({ username: name, email: email, password: password })];
                    case 2:
                        _a.sent();
                        this.showAlert('Registration successful! Please log in.', 'success');
                        this.toggleForms('login');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        this.showAlert('Registration failed. Please try again.', 'danger');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.showAlert = function (message, type) {
        var alertDiv = document.createElement('div');
        alertDiv.className = "alert alert-".concat(type, " alert-dismissible fade show");
        alertDiv.role = 'alert';
        alertDiv.innerHTML = "\n            ".concat(message, "\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n        ");
        document.body.appendChild(alertDiv);
        setTimeout(function () {
            alertDiv.remove();
        }, 3000);
    };
    return App;
}());
// Initialize the app
new App();
