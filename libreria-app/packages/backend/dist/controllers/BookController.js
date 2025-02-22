"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const data_source_1 = require("../data-source");
const Book_1 = require("../models/Book");
const class_validator_1 = require("class-validator");
const googleBooks_1 = require("../services/googleBooks");
const isbnArgentina_1 = require("../services/isbnArgentina");
const openLibrary_1 = require("../services/openLibrary");
const mercadoLibre_1 = require("../services/mercadoLibre");
class BookController {
    constructor() {
        this.bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        this.googleBooksService = new googleBooks_1.GoogleBooksService();
    }
    static async all(req, res) {
        const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        try {
            const books = await bookRepository.find();
            return res.json(books);
        }
        catch (error) {
            console.error('Error fetching books:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    static async one(req, res) {
        const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        try {
            const id = parseInt(req.params.id);
            const book = await bookRepository.findOne({ where: { id } });
            if (!book) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            return res.json(book);
        }
        catch (error) {
            console.error('Error fetching book:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    static async create(req, res) {
        const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        try {
            const book = bookRepository.create(req.body);
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
            const errors = await (0, class_validator_1.validate)(book);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const result = await bookRepository.save(book);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error('Error creating book:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    static async update(req, res) {
        const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
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
            const errors = await (0, class_validator_1.validate)(book);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const result = await bookRepository.save(book);
            return res.json(result);
        }
        catch (error) {
            console.error('Error updating book:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    static async delete(req, res) {
        const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        try {
            const id = parseInt(req.params.id);
            const book = await bookRepository.findOne({ where: { id } });
            if (!book) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            await bookRepository.remove(book);
            return res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting book:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    static async getBookByISBN(req, res) {
        try {
            const { isbn } = req.params;
            const googleBooksService = new googleBooks_1.GoogleBooksService();
            // Try Google Books first
            let bookData = await googleBooksService.searchGoogleBooks(isbn);
            if (!bookData) {
                // Try ISBN Argentina as third option
                bookData = await (0, isbnArgentina_1.searchISBNArgentina)(isbn);
            }
            if (!bookData) {
                // Try OpenLibrary as second option
                bookData = await (0, openLibrary_1.searchOpenLibrary)(isbn);
            }
            if (!bookData) {
                // Try MercadoLibre as last option
                bookData = await (0, mercadoLibre_1.searchMercadoLibre)(isbn);
            }
            if (!bookData) {
                return res.status(404).json({ message: 'Libro no encontrado en ningún servicio' });
            }
            return res.json(bookData);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            return res.status(500).json({ message });
        }
    }
}
exports.BookController = BookController;
exports.default = BookController;
