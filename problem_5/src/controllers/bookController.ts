import { Book } from "../models/book.js";
import { Request, Response } from "express";

import { getAllBooks } from "../services/bookService.js";

export const getBooks = async (req: Request, res: Response) => {
    // Extract query parameters (i.e. author, title, or ISBN)
    const { author, title, isbn } = req.query;

    try {
        const books: Book[] = await getAllBooks(author as string, title as string, isbn as string);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error });
    }
};