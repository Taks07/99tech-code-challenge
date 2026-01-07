import db from "../../db/database.js";
import { Book } from "../models/book.js";

export const getAllBooks = (author?: string, title?: string, isbn?: string): Promise<Book[]> => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Books";
        const params: any[] = [];

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