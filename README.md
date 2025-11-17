# 📚 Books API Project

A complete REST API for managing a books library built with Node.js and Express.js, featuring a web-based UI for testing and interaction.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, Delete books
- **RESTful API**: Clean, standardized endpoints
- **Web UI**: Interactive HTML interface for testing
- **CORS Enabled**: Cross-origin requests supported
- **In-Memory Storage**: Fast, simple data persistence
- **Error Handling**: Comprehensive validation and error responses

## 📁 Project Structure

```
Task-3/
├── server.js              # Main API server (port 3001)
├── complete-server.js     # Full server with embedded UI (port 3000)
├── books-ui.html          # Standalone UI for API testing
├── working-books-ui.html  # Enhanced UI with modern design
├── simple.html            # Basic API connection test
├── package.json           # Project dependencies and scripts
├── README.md              # This file
└── node_modules/          # Installed dependencies
```

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/Karthikn-code/Task-3.git
   cd Task-3
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Option 1: API Server Only (Recommended)
```bash
npm start
# or
node server.js
```
- **API Server**: http://localhost:3001
- **UI**: Open `books-ui.html` or `working-books-ui.html` in browser

### Option 2: Full Server with Embedded UI
```bash
node complete-server.js
```
- **Full App**: http://localhost:3000 (includes API + UI)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get book by ID |
| POST | `/books` | Create new book |
| PUT | `/books/:id` | Update book by ID |
| DELETE | `/books/:id` | Delete book by ID |
| DELETE | `/books` | Delete all books |

### 📝 Request/Response Examples

#### Get All Books
```bash
GET http://localhost:3001/books
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  ],
  "count": 1
}
```

#### Create New Book
```bash
POST http://localhost:3001/books
Content-Type: application/json

{
  "title": "1984",
  "author": "George Orwell"
}
```

Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "1984",
    "author": "George Orwell"
  }
}
```

## 🎨 User Interfaces

### 1. Working Books UI (`working-books-ui.html`)
- Modern, responsive design
- Real-time status updates
- Grid layout for books display
- Comprehensive testing interface

### 2. Books UI (`books-ui.html`)
- Clean, functional interface
- All CRUD operations
- Response display area

### 3. Simple Test (`simple.html`)
- Basic connectivity test
- Quick API validation

## 🧪 Testing the API

### Using the Web UI
1. Start the server: `node server.js`
2. Open any HTML file in your browser
3. Test various operations using the buttons

### Using curl
```bash
# Get all books
curl http://localhost:3001/books

# Get specific book
curl http://localhost:3001/books/1

# Create new book
curl -X POST http://localhost:3001/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author Name"}'

# Update book
curl -X PUT http://localhost:3001/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","author":"Updated Author"}'

# Delete book
curl -X DELETE http://localhost:3001/books/1

# Delete all books
curl -X DELETE http://localhost:3001/books
```

## 📦 Dependencies

- **express**: ^4.18.2 - Web framework for Node.js
- **nodemon**: ^3.0.1 - Development tool for auto-restarting server

## 🔧 Development

### Available Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Project Notes
- **Port 3001**: Main API server
- **Port 3000**: Complete server with UI
- **Data Storage**: In-memory (resets on server restart)
- **CORS**: Enabled for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - feel free to use this project for learning and development.

## 📞 Support

If you encounter any issues:
1. Check that the server is running on the correct port
2. Verify package.json dependencies are installed
3. Check browser console for JavaScript errors
4. Ensure no other applications are using ports 3000 or 3001

---

**Happy coding! 🚀**
