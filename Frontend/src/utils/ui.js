"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAlert = showAlert;
exports.showConfirm = showConfirm;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.setLoading = setLoading;
function showAlert(message, type) {
    if (type === void 0) { type = 'info'; }
    var alertDiv = document.createElement('div');
    alertDiv.className = "alert alert-".concat(type, " alert-dismissible fade show position-fixed top-0 end-0 m-3");
    alertDiv.role = 'alert';
    alertDiv.innerHTML = "\n        ".concat(message, "\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n    ");
    document.body.appendChild(alertDiv);
    setTimeout(function () {
        alertDiv.remove();
    }, 5000);
}
function showConfirm(message) {
    return new Promise(function (resolve) {
        var confirmed = window.confirm(message);
        resolve(confirmed);
    });
}
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function formatDateTime(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function setLoading(loading) {
    var loadingElement = document.getElementById('loading');
    if (loading) {
        if (!loadingElement) {
            var div = document.createElement('div');
            div.id = 'loading';
            div.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75';
            div.style.zIndex = '9999';
            div.innerHTML = "\n                <div class=\"spinner-border text-primary\" role=\"status\">\n                    <span class=\"visually-hidden\">Loading...</span>\n                </div>\n            ";
            document.body.appendChild(div);
        }
    }
    else {
        loadingElement === null || loadingElement === void 0 ? void 0 : loadingElement.remove();
    }
}
