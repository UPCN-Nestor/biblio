"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMercadoLibre = searchMercadoLibre;
const axios_1 = __importDefault(require("axios"));
async function searchMercadoLibre(isbn) {
    console.log('🔍 Buscando en Mercado Libre:', isbn);
    try {
        const response = await axios_1.default.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA3025&q=${isbn}`);
        console.log('✅ Mercado Libre respuesta:', JSON.stringify(response.data, null, 2));
        const item = response.data.results[0];
        if (!item)
            return null;
        return {
            title: item.title,
            authors: [], // ML no proporciona autor directamente
            publisher: item.seller.nickname || 'Unknown',
            publishedDate: new Date().getFullYear().toString(),
            description: item.description,
            coverImage: item.thumbnail,
            source: 'Mercado Libre',
            isbn: isbn
        };
    }
    catch (error) {
        console.log('❌ Mercado Libre error:', error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}
