# Express Book Reviews API

REST API for book reviews with JWT session authentication built with Express.js.

**Live:** https://express-book-reviews.onrender.com  
**Built by:** [Ajayi Taiwo John](https://groovyjwttp-portfolio.vercel.app)

## Features
- 10 books across 5 genres with reviews and pricing
- Get books by ISBN, author, or partial title (case-insensitive)
- Sync and async/Promise variants for all book lookups
- JWT session authentication for review management
- Add, update, and delete your own reviews
- Input validation (username ≥ 3 chars, password ≥ 6 chars)
- 33 passing tests (books + auth)

## Tech Stack
Node.js · Express.js · JWT · express-session · bcryptjs · Jest · Supertest

## Quick Start
```bash
git clone https://github.com/stopitmane/expressBookReviews.git
cd expressBookReviews && npm install && npm start
```

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/books` | All books |
| GET | `/books/isbn/:isbn` | Book by ISBN |
| GET | `/books/author/:author` | Books by author |
| GET | `/books/title/:title` | Books by title (partial) |
| GET | `/books/review/:isbn` | Reviews for a book |
| GET | `/books/async/books` | All books (async) |
| GET | `/books/async/isbn/:isbn` | Book by ISBN (Promise) |
| GET | `/books/async/author/:author` | Books by author (async) |
| GET | `/books/async/title/:title` | Books by title (async) |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customer/register` | Register (username ≥ 3, password ≥ 6) |
| POST | `/customer/login` | Login — sets session + returns JWT |
| PUT | `/customer/auth/review/:isbn` | Add/update review (session auth) |
| DELETE | `/customer/auth/review/:isbn` | Delete your review |

## Running Tests
```bash
npm test
# 33 passed
```
