export function showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

export function showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
        const confirmed = window.confirm(message);
        resolve(confirmed);
    });
}

export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDateTime(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function setLoading(loading: boolean) {
    const loadingElement = document.getElementById('loading');
    if (loading) {
        if (!loadingElement) {
            const div = document.createElement('div');
            div.id = 'loading';
            div.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75';
            div.style.zIndex = '9999';
            div.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `;
            document.body.appendChild(div);
        }
    } else {
        loadingElement?.remove();
    }
}
