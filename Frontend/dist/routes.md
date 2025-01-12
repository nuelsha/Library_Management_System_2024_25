# Frontend Routes Structure

## Authentication Routes
- `/pages/auth/login.html` - Login page
- `/pages/auth/signup.html` - Registration page

## User Routes
### Books
- `/pages/books/index.html` - Book listing (landing page)
- `/pages/books/detail.html?id={bookId}` - Book details

### Borrowing
- `/pages/borrowing/index.html` - User's borrowing history
- `/pages/borrowing/active.html` - Active borrowings
- `/pages/borrowing/history.html` - Past borrowings

### User Profile
- `/pages/user/profile.html` - User profile
- `/pages/user/settings.html` - User settings

### Notifications
- `/pages/notifications/index.html` - User notifications

## Admin Routes
### Dashboard
- `/pages/admin/dashboard.html` - Admin dashboard

### Books Management
- `/pages/admin/books/index.html` - Book listing
- `/pages/admin/books/add.html` - Add new book
- `/pages/admin/books/edit.html?id={bookId}` - Edit book

### Users Management
- `/pages/admin/users/index.html` - User listing
- `/pages/admin/users/detail.html?id={userId}` - User details

### Borrowings Management
- `/pages/admin/borrowings/index.html` - All borrowings
- `/pages/admin/borrowings/overdue.html` - Overdue borrowings
