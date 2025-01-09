document.getElementById('bookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    
    const bookList = document.getElementById('bookList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td>
            <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash"></i> Delete</button>
        </td>
    `;
    bookList.appendChild(row);

    document.getElementById('bookForm').reset();
});

// Delete book
document.getElementById('bookList').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
        e.target.closest('tr').remove();
    }
});