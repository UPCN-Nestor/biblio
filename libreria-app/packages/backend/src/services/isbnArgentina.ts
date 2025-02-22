import axios from 'axios';
import * as cheerio from 'cheerio';
import { BookData } from '../types/BookData';

export async function searchISBNArgentina(isbn: string): Promise<BookData | null> {
  try {
    const formData = new FormData();
    formData.append('isbn', isbn);

    const response = await axios.post(
      'https://www.isbn.org.ar/web/busqueda-avanzada-resultados.php',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );

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
      publishedDate: '',
      source: 'ISBN Argentina'
    };

  } catch (error) {
    console.error('Error searching ISBN Argentina:', error);
    return null;
  }
} 