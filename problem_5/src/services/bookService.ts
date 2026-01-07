import db from "../../db/database.js";
import { Book } from "../models/book.js";

// Function to get all books with optional filters
const getAllBooks = (author?: string, title?: string, isbn?: string): Promise<Book[]> => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Books";
        const params: any[] = [];

        // Depending on which filters are provided, build up the query accordingly
        if (author) {
            query += " WHERE author LIKE ?";
            params.push(`%${author}%`);
        }

        if (title) {
            query += params.length ? " AND title LIKE ?" : " WHERE title LIKE ?";
            params.push(`%${title}%`);
        }

        if (isbn) {
            query += params.length ? " AND isbn LIKE ?" : " WHERE isbn LIKE ?";
            params.push(`%${isbn}%`);
        }

        db.all<Book>(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Function to get a book by its ID
const getBookById = (id: number): Promise<Book | null> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Books WHERE id = ?";
        db.get<Book>(query, [id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row || null);
            }
        });
    });
};

// Function to create a new book and return its database ID
const makeBook = (book: Omit<Book, "id">): Promise<number> => {
    return new Promise((resolve, reject) => {
        const { title, author, published_date, isbn } = book;
        const query = `INSERT INTO Books (title, author, published_date, isbn) VALUES (?, ?, ?, ?)`;
        const params = [title, author, published_date, isbn];
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

// Function to update an existing book by its ID and return a boolean indicating success
const updateBook = (id: number, book: Partial<Omit<Book, "id">>): Promise<void> => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const params: any[] = [];
        // For each field in the new book object, add it to the update query if it exists. If it doesn't exist, skip updating it.
        for (const key in book) {
            fields.push(`${key} = ?`);
            params.push((book as any)[key]);
        }

        // No fields to update, so resolve immediately
        if (fields.length === 0) {
            resolve();
            return;
        }

        const query = `UPDATE Books SET ${fields.join(", ")} WHERE id = ?`;
        params.push(id);

        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Function to delete a book by its ID and return a boolean indicating success
const deleteBook = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Books WHERE id = ?`;
        db.run(query, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export { getAllBooks, getBookById, makeBook, updateBook, deleteBook };