import { Book } from '../entities/Book';
import * as bookRepository from '../repositories/bookRepository';

export const addBook = async (bookData: Omit<Book, 'id'>): Promise<Book> => {
  return bookRepository.createBook(bookData);
};

export const getPaginatedBooks = async (page: number, pageSize: number): Promise<Book[]> => {
  return bookRepository.getPaginatedBooks(page, pageSize);
};
export const getBookById = async (bookId: number): Promise<Book | null> => {
  return bookRepository.getBookById(bookId);
};