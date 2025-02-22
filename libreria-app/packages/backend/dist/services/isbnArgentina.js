"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchISBNArgentina = searchISBNArgentina;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
async function searchISBNArgentina(isbn) {
    try {
        const formData = new FormData();
        formData.append('isbn', isbn);
        const response = await axios_1.default.post('https://www.isbn.org.ar/web/busqueda-avanzada-resultados.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        const $ = cheerio.load(response.data);
        // Buscar la primera fila de datos después del thead
        const firstRow = $('table tbody tr').first();
        if (!firstRow.length) {
            return null;
        }
        // Obtener los datos de las columnas
        const columns = firstRow.find('td');
        return {
            title: $(columns[1]).text().trim(),
            authors: [$(columns[2]).text().trim()],
            publisher: $(columns[3]).text().trim(),
            isbn: isbn,
            description: '',
            source: 'ISBN Argentina'
        };
    }
    catch (error) {
        console.error('Error searching ISBN Argentina:', error);
        return null;
    }
}
