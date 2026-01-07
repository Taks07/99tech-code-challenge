# Problem 5: A Crude Server

This repository contains a small ExpressJS server that exposes a simple books API backed by SQLite.

**Requirements**
- Node.js (v16+ recommended)
- npm

**Install**

```bash
npm install
```

**Run**

Start the server with:

```bash
npm start
```

By default the server listens on http://localhost:3000.

The database file is `db/database.db` and the schema is created from `db/database.sql` on startup.

**Endpoints**

**GET /api/books**
- Description: Retrieve all books. Supports optional query filters.
- Query params:
  - `author` (string) — filter by author
  - `title` (string) — filter by title
  - `isbn` (string) — filter by ISBN
- Response: 200 JSON array of book objects
- Example:

```bash
curl "http://localhost:3000/api/books?author=Rowling"
```

**GET /api/books/:id**
- Description: Retrieve a single book by ID in the path parameter
- Response: 200 JSON book object or 404 if not found
- Example:

```bash
curl http://localhost:3000/api/books/1
```

**POST /api/books**
- Description: Create a new book
- Request body (JSON):
  - `title` (string)
  - `author` (string)
  - `published_date` (string, e.g. "2020-01-01")
  - `isbn` (string)
- Response: 201 JSON object containing created book (including `id`)
- Example:

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"My Book","author":"Me","published_date":"2024-01-01","isbn":"1234567890"}'
```

**PUT /api/books/:id**
- Description: Update an existing book (partial updates allowed) by ID in the path parameter
- Request body (JSON): any subset of `title`, `author`, `published_date`, `isbn`
- Response: 200 on success or 500 if error
- Example:

```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title"}'
```

**DELETE /api/books/:id**
- Description: Delete a book by ID in the path parameter
- Response: 200 on success or 500 if error
- Example:

```bash
curl -X DELETE http://localhost:3000/api/books/1
```
