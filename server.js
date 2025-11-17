const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Enable CORS - Add this section
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// In-memory storage for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];

// Helper function to generate ID
const generateId = () => {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
};

// GET all books
app.get('/books', (req, res) => {
    res.json({
        success: true,
        data: books,
        count: books.length
    });
});

// GET book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    res.json({
        success: true,
        data: book
    });
});

// POST new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    const newBook = {
        id: generateId(),
        title,
        author
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
    });
});

// PUT update book
app.put('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const { title, author } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    books[bookIndex] = {
        id: parseInt(req.params.id),
        title,
        author
    };
    
    res.json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    });
});

// DELETE ALL BOOKS
app.delete('/books', (req, res) => {
    const deletedCount = books.length;
    books = [];
    
    res.json({
        success: true,
        message: `All ${deletedCount} books deleted successfully`,
        data: []
    });
});

// 404 Handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log('📚 Books API Endpoints:');
    console.log('   GET    /books');
    console.log('   GET    /books/:id');
    console.log('   POST   /books');
    console.log('   PUT    /books/:id');
    console.log('   DELETE /books/:id');
    console.log('   DELETE /books (delete all)');
});