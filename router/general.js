const express = require('express');
const axios = require('axios');
const { books } = require('./booksdb');

const public_users = express.Router();

// Task 1: Get all books available in the shop
public_users.get('/', function (req, res) {
    // Using JSON.stringify for neat display as per hint
    return res.status(200).json(JSON.parse(JSON.stringify(books)));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const bookKeys = Object.keys(books);
    const matchingBooks = [];
    
    // Iterate through books array and check if author matches
    bookKeys.forEach(key => {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    });
    
    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({ message: "No books found for this author" });
    }
});

// Task 4: Get book details based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const bookKeys = Object.keys(books);
    const matchingBooks = [];
    
    // Similar to Task 3, iterate through books and check title
    bookKeys.forEach(key => {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    });
    
    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 5: Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (book && book.reviews) {
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({ message: "No reviews found for this ISBN" });
    }
});

// Task 10: Get all books using Promise callbacks or async-await with Axios
public_users.get('/async/books', async (req, res) => {
    try {
        // Using async-await to get all books
        const getAllBooks = () => {
            return new Promise((resolve, reject) => {
                try {
                    resolve(books);
                } catch (error) {
                    reject(error);
                }
            });
        };
        
        const allBooks = await getAllBooks();
        return res.status(200).json(allBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Task 11: Get book details based on ISBN using Promise callbacks or async-await with Axios
public_users.get('/async/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    
    // Using Promise callbacks
    const getBookByISBN = (isbn) => {
        return new Promise((resolve, reject) => {
            const book = books[isbn];
            if (book) {
                resolve(book);
            } else {
                reject(new Error("Book not found"));
            }
        });
    };
    
    getBookByISBN(isbn)
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ message: error.message }));
});

// Task 12: Get book details based on Author using Promise callbacks or async-await with Axios
public_users.get('/async/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        
        // Using async-await
        const getBooksByAuthor = async (authorName) => {
            return new Promise((resolve, reject) => {
                const bookKeys = Object.keys(books);
                const matchingBooks = [];
                
                bookKeys.forEach(key => {
                    if (books[key].author.toLowerCase() === authorName.toLowerCase()) {
                        matchingBooks.push(books[key]);
                    }
                });
                
                if (matchingBooks.length > 0) {
                    resolve(matchingBooks);
                } else {
                    reject(new Error("No books found for this author"));
                }
            });
        };
        
        const authorBooks = await getBooksByAuthor(author);
        return res.status(200).json(authorBooks);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Task 13: Get book details based on Title using Promise callbacks or async-await with Axios
public_users.get('/async/title/:title', (req, res) => {
    const title = req.params.title;
    
    // Using Promise callbacks
    const getBooksByTitle = (bookTitle) => {
        return new Promise((resolve, reject) => {
            const bookKeys = Object.keys(books);
            const matchingBooks = [];
            
            bookKeys.forEach(key => {
                if (books[key].title.toLowerCase() === bookTitle.toLowerCase()) {
                    matchingBooks.push(books[key]);
                }
            });
            
            if (matchingBooks.length > 0) {
                resolve(matchingBooks);
            } else {
                reject(new Error("No books found with this title"));
            }
        });
    };
    
    getBooksByTitle(title)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ message: error.message }));
});

module.exports.general = public_users;
