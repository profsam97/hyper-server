// controllers/bookController.ts
import { Request, Response } from 'express';
import * as bookService from '../Services/bookService';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.addBook(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = 20; // Adjust the page size as needed

  try {
    const books = await bookService.getPaginatedBooks(page, pageSize);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching books' });
  }
};


export const getBookById = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);

  try {
    const book = await bookService.getBookById(bookId);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching book' });
  }
};