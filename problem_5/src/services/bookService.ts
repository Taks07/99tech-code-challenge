import db from "../../db/database.js";
import { Book } from "../models/book.js";

export const getAllBooks = (): Promise<Book[]> => {
    return new Promise((resolve, reject) => {
        db.all<Book>("SELECT * FROM Books", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};