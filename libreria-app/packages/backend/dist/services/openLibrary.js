"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOpenLibrary = searchOpenLibrary;
const axios_1 = __importDefault(require("axios"));
async function searchOpenLibrary(isbn) {
    var _a, _b, _c, _d;
    console.log('🔍 Buscando en Open Library:', isbn);
    try {
        const response = await axios_1.default.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        console.log('✅ Open Library respuesta:', JSON.stringify(response.data, null, 2));
        const bookData = response.data[`ISBN:${isbn}`];
        if (!bookData)
            return null;
        return {
            title: bookData.title,
            authors: ((_a = bookData.authors) === null || _a === void 0 ? void 0 : _a.map((author) => author.name)) || [],
            publisher: (_c = (_b = bookData.publishers) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name,
            publishedDate: bookData.publish_date,
            description: bookData.notes,
            coverImage: (_d = bookData.cover) === null || _d === void 0 ? void 0 : _d.large,
            source: 'Open Library',
            isbn: isbn
        };
    }
    catch (error) {
        console.log('❌ Open Library error:', error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}
