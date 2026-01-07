import { Book } from "../models/book.js";
import { Request, Response } from "express";

import { getAllBooks, getBookById, makeBook, updateBook, deleteBook } from "../services/bookService.js";

// Controller function to get all books with optional filters
const getBooks = async (req: Request, res: Response) => {
    // Extract query parameters (i.e. author, title, or ISBN)
    const { author, title, isbn } = req.query;

    try {
        const books: Book[] = await getAllBooks(author as string, title as string, isbn as string);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error });
    }
};

// Controller function to get a book by its ID
const getBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id, 10);

    try {
        const book: Book | null = await getBookById(bookId);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book", error });
    }
};

// Controller function to create a new book and return its ID
const createBook = async (req: Request, res: Response) => {
    const newBookData: Omit<Book, "id"> = req.body;
    try {
        const newBookId: number = await makeBook(newBookData);
        res.status(201).json({ id: newBookId, ...newBookData });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error });
    }   
};

// Controller function to update an existing book's details
const updateBookDetails = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id, 10);
    const updatedBookData: Partial<Omit<Book, "id">> = req.body;
    try {
        await updateBook(bookId, updatedBookData);
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};

// Controller function to delete a book by its ID
const deleteBookById = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id, 10);
    try {
        await deleteBook(bookId);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }   
};

export { getBooks, getBook, createBook, updateBookDetails, deleteBookById };