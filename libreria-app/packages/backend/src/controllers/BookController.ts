import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Book } from '../models/Book';
import { validate } from 'class-validator';
import { GoogleBooksService } from '../services/googleBooks';
import { searchISBNArgentina } from '../services/isbnArgentina';
import { searchOpenLibrary } from '../services/openLibrary';
import { searchMercadoLibre } from '../services/mercadoLibre';
import { BookData } from '../types/BookData';

export class BookController {
  private bookRepository = AppDataSource.getRepository(Book);
  private googleBooksService = new GoogleBooksService();

  static async all(req: Request, res: Response) {
    const bookRepository = AppDataSource.getRepository(Book);
    try {
      const books = await bookRepository.find();
      return res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async one(req: Request, res: Response) {
    const bookRepository = AppDataSource.getRepository(Book);
    try {
      const id = parseInt(req.params.id);
      const book = await bookRepository.findOne({ where: { id } });

      if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }

      return res.json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async create(req: Request, res: Response) {
    const bookRepository = AppDataSource.getRepository(Book);
    try {
      const book = bookRepository.create(req.body as Partial<Book>);
      
      // Validación básica
      if (!book.title || !book.author || !book.isbn) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      // Verificar ISBN único
      const existingBook = await bookRepository.findOne({ 
        where: { isbn: book.isbn } 
      });
      
      if (existingBook) {
        return res.status(400).json({ message: 'El ISBN ya existe' });
      }

      const errors = await validate(book);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const result = await bookRepository.save(book);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error creating book:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async update(req: Request, res: Response) {
    const bookRepository = AppDataSource.getRepository(Book);
    try {
      const id = parseInt(req.params.id);
      let book = await bookRepository.findOne({ where: { id } });

      if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }

      // Verificar ISBN único si se está actualizando
      if (req.body.isbn && req.body.isbn !== book.isbn) {
        const existingBook = await bookRepository.findOne({ 
          where: { isbn: req.body.isbn } 
        });
        
        if (existingBook) {
          return res.status(400).json({ message: 'El ISBN ya existe' });
        }
      }

      bookRepository.merge(book, req.body);
      
      const errors = await validate(book);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const result = await bookRepository.save(book);
      return res.json(result);
    } catch (error) {
      console.error('Error updating book:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async delete(req: Request, res: Response) {
    const bookRepository = AppDataSource.getRepository(Book);
    try {
      const id = parseInt(req.params.id);
      const book = await bookRepository.findOne({ where: { id } });

      if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }

      await bookRepository.remove(book);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getBookByISBN(req: Request, res: Response) {
    try {
      const { isbn } = req.params;
      const googleBooksService = new GoogleBooksService();
      
      // Inicializar objeto bookData
      let bookData: BookData | null = null;

      // Consultar Google Books
      const googleData = await googleBooksService.searchGoogleBooks(isbn);
      if (googleData) {
        bookData = { ...googleData };
      }

      /*
      // Consultar ISBN Argentina y combinar datos
      const isbnArgentinaData = await searchISBNArgentina(isbn);
      if (isbnArgentinaData) {
        bookData = bookData ? {
          ...bookData,
          ...isbnArgentinaData,
          // Preservar datos existentes si ya tienen valor
          title: bookData.title || isbnArgentinaData.title,
          authors: bookData.authors || isbnArgentinaData.authors,
          publisher: bookData.publisher || isbnArgentinaData.publisher,
          publishedDate: bookData.publishedDate || isbnArgentinaData.publishedDate,
          description: bookData.description || isbnArgentinaData.description,
          coverImage: bookData.coverImage || isbnArgentinaData.coverImage
        } : isbnArgentinaData;
      }*/

      // Consultar Open Library y combinar datos
      const openLibraryData = await searchOpenLibrary(isbn);
      if (openLibraryData) {
        bookData = bookData ? {
          ...bookData,
          ...openLibraryData,
          title: bookData.title || openLibraryData.title,
          authors: bookData.authors || openLibraryData.authors,
          publisher: bookData.publisher || openLibraryData.publisher,
          publishedDate: bookData.publishedDate || openLibraryData.publishedDate,
          description: bookData.description || openLibraryData.description,
          coverImage: bookData.coverImage || openLibraryData.coverImage,
          source: bookData.source + ' | ' + openLibraryData.source
        } : openLibraryData;
      }

      // Consultar MercadoLibre y combinar datos
      const mercadoLibreData = await searchMercadoLibre(isbn);
      if (mercadoLibreData) {
        bookData = bookData ? {
          ...bookData,
          ...mercadoLibreData,
          title: bookData.title || mercadoLibreData.title,
          authors: bookData.authors || mercadoLibreData.authors,
          publisher: bookData.publisher || mercadoLibreData.publisher,
          publishedDate: bookData.publishedDate || mercadoLibreData.publishedDate,
          description: bookData.description || mercadoLibreData.description,
          coverImage: bookData.coverImage || mercadoLibreData.coverImage,
          source: bookData.source + ' | ' + mercadoLibreData.source
        } : mercadoLibreData;
      }
      
      if (!bookData) {
        return res.status(404).json({ message: 'Libro no encontrado en ningún servicio' });
      }
      
      return res.json(bookData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({ message });
    }
  }
}

export default BookController; 