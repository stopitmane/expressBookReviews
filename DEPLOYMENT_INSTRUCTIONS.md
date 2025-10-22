# GitHub Deployment Instructions

## Step 1: Create GitHub Repository
1. Go to GitHub.com and sign in
2. Click "New Repository" or the "+" icon
3. Repository name: `express-book-reviews` (or any name you prefer)
4. Make it **Public** (required for peer review)
5. **Don't** check "Initialize with README" 
6. Click "Create Repository"

## Step 2: Add Remote and Push
After creating the repository, run these commands in the terminal:

```bash
# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Deployment
1. Go to your GitHub repository URL
2. You should see all the project files
3. Copy the repository URL for peer review submission

## Project Structure
```
express-book-reviews/
├── index.js                 # Main server file with authentication
├── package.json            # Dependencies and scripts
├── router/
│   ├── auth_users.js       # Authenticated user routes (Tasks 6-9)
│   ├── booksdb.js          # Book database
│   └── general.js          # General user routes (Tasks 1-5, 10-13)
└── README.md               # Project documentation
```

## Tasks Implemented
- ✅ Task 1-5: General user routes
- ✅ Task 6-7: User registration and login
- ✅ Task 8-9: Add/delete book reviews (authenticated)
- ✅ Task 10-13: Async/Promise versions of Tasks 1-4

## Testing
Server runs on: http://localhost:5001
Use Postman Desktop App to test all endpoints.