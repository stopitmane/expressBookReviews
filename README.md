# Express Book Reviews - Final Project

This is the final project for the Express Book Reviews application implementing all 13 required tasks.

## Features Implemented

### General User Routes (Tasks 1-5)
- ✅ **Task 1:** Get all books available in the shop
- ✅ **Task 2:** Get book details based on ISBN
- ✅ **Task 3:** Get book details based on author
- ✅ **Task 4:** Get book details based on title
- ✅ **Task 5:** Get book reviews based on ISBN

### Authentication Routes (Tasks 6-9)
- ✅ **Task 6:** Register a new user
- ✅ **Task 7:** Login as a registered user
- ✅ **Task 8:** Add or modify a book review (authenticated)
- ✅ **Task 9:** Delete a book review (authenticated)

### Async/Promise Routes (Tasks 10-13)
- ✅ **Task 10:** Get all books using Promise callbacks or async-await
- ✅ **Task 11:** Get book details based on ISBN using Promise callbacks
- ✅ **Task 12:** Get book details based on Author using async-await
- ✅ **Task 13:** Get book details based on Title using Promise callbacks

## Installation and Setup

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Server will run on `http://localhost:5001`

## API Endpoints

### Public Routes
- `GET /` - Get all books
- `GET /isbn/:isbn` - Get book by ISBN
- `GET /author/:author` - Get books by author
- `GET /title/:title` - Get books by title
- `GET /review/:isbn` - Get book reviews
- `GET /async/books` - Get all books (async)
- `GET /async/isbn/:isbn` - Get book by ISBN (async)
- `GET /async/author/:author` - Get books by author (async)
- `GET /async/title/:title` - Get books by title (async)

### Authentication Routes
- `POST /customer/register` - Register new user
- `POST /customer/login` - Login user

### Authenticated Routes
- `PUT /customer/auth/review/:isbn?review=text` - Add/modify review
- `DELETE /customer/auth/review/:isbn` - Delete review

## Testing

Use Postman Desktop App to test all endpoints. The server must be running on localhost:5001.

For authenticated routes (Tasks 8-9):
1. Register a user using `/customer/register`
2. Login using `/customer/login`
3. Copy the session cookie from login response headers
4. Use the cookie in subsequent authenticated requests

## Project Structure

```
├── index.js                 # Main server file with authentication middleware
├── package.json            # Dependencies and scripts
├── router/
│   ├── auth_users.js       # Authenticated user routes (Tasks 6-9)
│   ├── booksdb.js          # Book database with sample data
│   └── general.js          # General user routes (Tasks 1-5, 10-13)
└── README.md               # This file
```

## Technologies Used

- Node.js
- Express.js
- JWT (JSON Web Tokens)
- Express Session
- Axios (for async operations)

All tasks have been implemented and tested successfully.
