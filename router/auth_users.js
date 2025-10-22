const express = require('express');
const jwt = require('jsonwebtoken');
const { books } = require('./booksdb');

const regd_users = express.Router();
let users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_this';

// Check if username is valid (exists)
const isValid = (username) => {
    return users.some(user => user.username === username);
};

// Check if username and password match
const authenticatedUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

// Task 6: Register a new user
regd_users.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check if user already exists
    if (isValid(username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    // Register new user
    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
});

// Task 7: Login as a registered user
regd_users.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Validate user credentials
    const user = authenticatedUser(username, password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    
    // Save user credentials in session
    if (req.session) {
        req.session.authorization = {
            accessToken: token,
            username: username
        };
    }
    
    return res.status(200).json({ 
        message: "Login successful", 
        token: token 
    });
});

// Task 8: Add or modify a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const reviewText = req.query.review;
    
    // Get username from session
    const username = (req.user && req.user.username) || 
                    (req.session && req.session.authorization && req.session.authorization.username);
    
    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    if (!reviewText) {
        return res.status(400).json({ message: "Review text is required. Add ?review=your_review_text" });
    }
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Initialize reviews object if it doesn't exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }
    
    // Add or modify review (if same user posts again, it modifies existing review)
    books[isbn].reviews[username] = reviewText;
    
    return res.status(200).json({ 
        message: "Review added/updated successfully", 
        reviews: books[isbn].reviews 
    });
});

// Task 9: Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    
    // Get username from session
    const username = (req.user && req.user.username) || 
                    (req.session && req.session.authorization && req.session.authorization.username);
    
    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Check if review exists for this user
    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found for this user" });
    }
    
    // Delete the review (user can only delete their own review)
    delete books[isbn].reviews[username];
    
    return res.status(200).json({ 
        message: "Review deleted successfully", 
        reviews: books[isbn].reviews 
    });
});

module.exports.authenticated = regd_users;
