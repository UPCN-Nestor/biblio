import axios from 'axios';

interface GoogleBookResponse {
  items: {
    volumeInfo: {
      title: string;
      authors: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      pageCount?: number;
      categories?: string[];
      imageLinks?: {
        thumbnail: string;
      };
    };
  }[];
}

export class GoogleBooksService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  async getBookByISBN(isbn: string) {
    console.log('🔍 Buscando en Google Books:', isbn);
    try {
      const response = await axios.get<GoogleBookResponse>(`${this.baseUrl}?q=isbn:${isbn}`);
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
        coverImage: bookInfo.imageLinks?.thumbnail
      };
    } catch (error: any) {
      console.log('❌ Google Books error:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async searchGoogleBooks(isbn: string) {
    console.log('🔍 Buscando en Google Books:', isbn);
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      console.log('✅ Google Books respuesta:', JSON.stringify(response.data, null, 2));
      const bookData = response.data.items?.[0]?.volumeInfo;
      if (!bookData) return null;
      
      return {
        title: bookData.title,
        authors: bookData.authors || [],
        publisher: bookData.publisher,
        isbn: isbn,
        description: bookData.description,
        publishedDate: bookData.publishedDate || '',
        source: 'Google Books'
      };
    } catch (error) {
      console.log('❌ Google Books error:', error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  }
} 