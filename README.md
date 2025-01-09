<p align="center">
  <h1>Library Management System</h1>
</p>

## Description

A Library Management System built with NestJS framework. This system helps librarians and users manage books, borrowing, returns, and user accounts efficiently.

## Features

- User Authentication and Authorization
- Book Management (Add, Update, Delete, Search)
- Borrowing and Return Management
- User Management
- Fine Calculation System
- Reports Generation

## Project setup


# Clone the repository
$ git clone https://github.com/Yab112/natiNestjs.git

# Install dependencies
$ pnpm install


## Running the application


# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod


## Testing


# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov


## API Documentation

Once the application is running, you can access the Swagger API documentation at:

http://localhost:3000/api


## Database Setup

This project uses PostgreSQL as the database. Make sure to:
1. Install PostgreSQL
2. Create a database
3. Configure your `.env` file with the database credentials

## Environment Variables

Create a `.env` file in the root directory and add the following:


DATABASE_URL=postgresql://user:password@localhost:5432/library_db
JWT_SECRET=your_jwt_secret


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is [Addis Ababa licensed](LICENSE).
