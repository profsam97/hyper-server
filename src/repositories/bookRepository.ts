import { prisma } from '../database';
import { Book } from '../entities/Book';

export const createBook = async (bookData: Omit<Book, 'id'>): Promise<Book> => {
  return prisma.book.create({ data: bookData });
};

export const getPaginatedBooks = async (page: number, pageSize: number): Promise<Book[]> => {
  const offset = (page - 1) * pageSize;
  return prisma.book.findMany({
    skip: offset,
    take: pageSize,
    orderBy: { id: 'asc' }, 
  });
};
export const getBookById = async (bookId: number): Promise<Book | null> => {
  return prisma.book.findUnique({ where: { id: bookId } });
};