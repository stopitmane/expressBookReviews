const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    // Check if user is logged in and has valid access token
    if(req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        // Verify JWT token
        jwt.verify(token, "your_jwt_secret_key_here_change_this", (err, user) => {
            if(!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({message: "User not authenticated"});
            }
        });
    } else {
        return res.status(403).json({message: "User not logged in"});
    }
});
 

app.get('/', (req, res) => {
  res.json({
    name: 'Express Book Reviews API',
    version: '1.0.0',
    author: 'Ajayi Taiwo John',
    portfolio: 'https://groovyjwttp-portfolio.vercel.app',
    endpoints: {
      'GET /':                    'API info',
      'GET /books':               'All books',
      'GET /books/isbn/:isbn':    'Book by ISBN',
      'GET /books/author/:author':'Books by author',
      'GET /books/title/:title':  'Books by title',
      'GET /books/review/:isbn':  'Reviews for a book',
      'POST /customer/register': 'Register',
      'POST /customer/login':    'Login',
      'PUT /customer/auth/review/:isbn':    'Add/update review (auth)',
      'DELETE /customer/auth/review/:isbn': 'Delete review (auth)',
    }
  });
});
const PORT = process.env.PORT || 5001;

app.use("/customer", customer_routes);
app.use("/books", genl_routes);
app.use("/", genl_routes);

if (require.main === module) { app.listen(PORT, () => console.log("Server is running on port " + PORT)); }
module.exports = app;
