import { Book } from "../models/book.js";
import { Request, Response } from "express";

import { getAllBooks } from "../services/bookService.js";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books: Book[] = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error });
    }
};