const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

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

// API Routes

// GET all books
app.get('/api/books', (req, res) => {
  res.json({
    success: true,
    data: books,
    count: books.length
  });
});

// GET book by ID
app.get('/api/books/:id', (req, res) => {
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
app.post('/api/books', (req, res) => {
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
app.put('/api/books/:id', (req, res) => {
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
app.delete('/api/books/:id', (req, res) => {
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
app.delete('/api/books', (req, res) => {
  const deletedCount = books.length;
  books = [];
  
  res.json({
    success: true,
    message: `All ${deletedCount} books deleted successfully`,
    data: []
  });
});

// Serve the HTML UI at the root route
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Books API UI</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            background: #f0f2f5;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { 
            color: #2c3e50; 
            text-align: center;
            margin-bottom: 30px;
        }
        .section { 
            margin: 20px 0; 
            padding: 20px; 
            border: 1px solid #ddd; 
            border-radius: 8px;
            background: #fafafa;
        }
        button { 
            padding: 12px 20px; 
            margin: 5px; 
            cursor: pointer; 
            border: none;
            border-radius: 6px;
            font-weight: bold;
        }
        .btn-get { background: #3498db; color: white; }
        .btn-post { background: #27ae60; color: white; }
        .btn-put { background: #f39c12; color: white; }
        .btn-delete { background: #e74c3c; color: white; }
        input { 
            padding: 10px; 
            margin: 5px; 
            width: 200px; 
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .response { 
            background: #2c3e50; 
            color: white; 
            padding: 15px; 
            border-radius: 6px; 
            margin: 10px 0;
            font-family: monospace;
            white-space: pre-wrap;
            min-height: 100px;
        }
        .book-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
        }
        .status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📚 Books API Testing Interface</h1>
        <p style="text-align: center; color: #666;">Server: http://localhost:${PORT}</p>
        
        <div class="section">
            <h2>Quick Start</h2>
            <button class="btn-get" onclick="getAllBooks()">GET ALL BOOKS</button>
            <div id="status"></div>
        </div>

        <div class="section">
            <h2>Get Book by ID</h2>
            <input type="number" id="getBookId" placeholder="Book ID">
            <button class="btn-get" onclick="getBookById()">GET BOOK</button>
        </div>

        <div class="section">
            <h2>Add New Book</h2>
            <input type="text" id="title" placeholder="Book Title">
            <input type="text" id="author" placeholder="Author">
            <button class="btn-post" onclick="addBook()">ADD BOOK</button>
        </div>

        <div class="section">
            <h2>Update Book</h2>
            <input type="number" id="updateId" placeholder="Book ID">
            <input type="text" id="updateTitle" placeholder="New Title">
            <input type="text" id="updateAuthor" placeholder="New Author">
            <button class="btn-put" onclick="updateBook()">UPDATE BOOK</button>
        </div>

        <div class="section">
            <h2>Delete Operations</h2>
            <input type="number" id="deleteId" placeholder="Book ID">
            <button class="btn-delete" onclick="deleteBook()">DELETE BOOK</button>
            <button class="btn-delete" onclick="deleteAllBooks()">DELETE ALL</button>
        </div>

        <div class="section">
            <h2>API Response</h2>
            <div id="response" class="response">Click any button to test...</div>
        </div>

        <div class="section">
            <h2>Current Books</h2>
            <div id="booksList">No books loaded</div>
        </div>
    </div>

    <script>
        const API_BASE = 'http://localhost:${PORT}/api';

        function showStatus(message, isSuccess) {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = '<div class="status ' + (isSuccess ? 'success' : 'error') + '">' + message + '</div>';
        }

        function displayResponse(data) {
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        }

        async function getAllBooks() {
            try {
                showStatus('Loading books...', true);
                const response = await fetch(API_BASE + '/books');
                const data = await response.json();
                displayResponse(data);
                
                if (data.success) {
                    const booksHtml = data.data.map(book => 
                        '<div class="book-card"><strong>' + book.title + '</strong> by ' + book.author + ' (ID: ' + book.id + ')</div>'
                    ).join('');
                    document.getElementById('booksList').innerHTML = booksHtml;
                    showStatus('Loaded ' + data.data.length + ' books', true);
                } else {
                    showStatus('Error: ' + data.message, false);
                }
            } catch (error) {
                showStatus('Error: ' + error.message, false);
                displayResponse({error: error.message});
            }
        }

        async function getBookById() {
            const id = document.getElementById('getBookId').value;
            if (!id) return showStatus('Please enter Book ID', false);
            
            try {
                const response = await fetch(API_BASE + '/books/' + id);
                const data = await response.json();
                displayResponse(data);
                showStatus(data.success ? 'Book found!' : 'Error: ' + data.message, data.success);
            } catch (error) {
                showStatus('Error: ' + error.message, false);
            }
        }

        async function addBook() {
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            if (!title || !author) return showStatus('Please enter title and author', false);
            
            try {
                const response = await fetch(API_BASE + '/books', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({title, author})
                });
                const data = await response.json();
                displayResponse(data);
                if (data.success) {
                    showStatus('Book added! ID: ' + data.data.id, true);
                    document.getElementById('title').value = '';
                    document.getElementById('author').value = '';
                    getAllBooks();
                } else {
                    showStatus('Error: ' + data.message, false);
                }
            } catch (error) {
                showStatus('Error: ' + error.message, false);
            }
        }

        async function updateBook() {
            const id = document.getElementById('updateId').value;
            const title = document.getElementById('updateTitle').value;
            const author = document.getElementById('updateAuthor').value;
            if (!id || !title || !author) return showStatus('Please fill all fields', false);
            
            try {
                const response = await fetch(API_BASE + '/books/' + id, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({title, author})
                });
                const data = await response.json();
                displayResponse(data);
                if (data.success) {
                    showStatus('Book updated!', true);
                    getAllBooks();
                } else {
                    showStatus('Error: ' + data.message, false);
                }
            } catch (error) {
                showStatus('Error: ' + error.message, false);
            }
        }

        async function deleteBook() {
            const id = document.getElementById('deleteId').value;
            if (!id) return showStatus('Please enter Book ID', false);
            if (!confirm('Delete book #' + id + '?')) return;
            
            try {
                const response = await fetch(API_BASE + '/books/' + id, {method: 'DELETE'});
                const data = await response.json();
                displayResponse(data);
                if (data.success) {
                    showStatus('Book deleted!', true);
                    getAllBooks();
                } else {
                    showStatus('Error: ' + data.message, false);
                }
            } catch (error) {
                showStatus('Error: ' + error.message, false);
            }
        }

        async function deleteAllBooks() {
            if (!confirm('Delete ALL books?')) return;
            try {
                const response = await fetch(API_BASE + '/books', {method: 'DELETE'});
                const data = await response.json();
                displayResponse(data);
                if (data.success) {
                    showStatus('All books deleted!', true);
                    getAllBooks();
                } else {
                    showStatus('Error: ' + data.message, false);
                }
            } catch (error) {
                showStatus('Error: ' + error.message, false);
            }
        }

        // Load books on page load
        getAllBooks();
    </script>
</body>
</html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 API Base: http://localhost:${PORT}/api`);
  console.log('🎨 UI Available at: http://localhost:3000');
});