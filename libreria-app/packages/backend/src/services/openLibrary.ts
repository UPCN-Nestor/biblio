import axios from 'axios';

export async function searchOpenLibrary(isbn: string) {
  console.log('🔍 Buscando en Open Library:', isbn);
  try {
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    console.log('✅ Open Library respuesta:', JSON.stringify(response.data, null, 2));
    const bookData = response.data[`ISBN:${isbn}`];
    
    if (!bookData) return null;

    return {
      title: bookData.title,
      authors: bookData.authors?.map((author: any) => author.name) || [],
      publisher: bookData.publishers?.[0]?.name,
      publishedDate: bookData.publish_date,
      description: bookData.notes,
      coverImage: bookData.cover?.large,
      source: 'Open Library',
      isbn: isbn,
      pageCount: bookData.number_of_pages,
      
    };
  } catch (error) {
    console.log('❌ Open Library error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
} 