"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBooksService = void 0;
const axios_1 = __importDefault(require("axios"));
class GoogleBooksService {
    constructor() {
        this.baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    }
    async getBookByISBN(isbn) {
        var _a;
        console.log('🔍 Buscando en Google Books:', isbn);
        try {
            const response = await axios_1.default.get(`${this.baseUrl}?q=isbn:${isbn}`);
            console.log('✅ Google Books respuesta:', JSON.stringify(response.data, null, 2));
            if (!response.data.items || response.data.items.length === 0) {
                throw new Error('No book found with this ISBN');
            }
            const bookInfo = response.data.items[0].volumeInfo;
            return {
                title: bookInfo.title,
                authors: bookInfo.authors || [],
                publisher: bookInfo.publisher,
                publishedDate: bookInfo.publishedDate,
                description: bookInfo.description,
                pageCount: bookInfo.pageCount,
                categories: bookInfo.categories,
                coverImage: (_a = bookInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail
            };
        }
        catch (error) {
            console.log('❌ Google Books error:', error instanceof Error ? error.message : 'Unknown error');
            throw error;
        }
    }
    async searchGoogleBooks(isbn) {
        var _a, _b;
        console.log('🔍 Buscando en Google Books:', isbn);
        try {
            const response = await axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            console.log('✅ Google Books respuesta:', JSON.stringify(response.data, null, 2));
            const bookData = (_b = (_a = response.data.items) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.volumeInfo;
            if (!bookData)
                return null;
            return {
                title: bookData.title,
                authors: bookData.authors || [],
                publisher: bookData.publisher,
                isbn: isbn,
                description: bookData.description,
                source: 'Google Books'
            };
        }
        catch (error) {
            console.log('❌ Google Books error:', error instanceof Error ? error.message : 'Unknown error');
            return null;
        }
    }
}
exports.GoogleBooksService = GoogleBooksService;
