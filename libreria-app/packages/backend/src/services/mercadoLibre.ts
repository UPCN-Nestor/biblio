import axios from 'axios';

export async function searchMercadoLibre(isbn: string) {
  console.log('🔍 Buscando en Mercado Libre:', isbn);
  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA3025&q=${isbn}`);
    console.log('✅ Mercado Libre respuesta:', JSON.stringify(response.data, null, 2));
    const item = response.data.results[0];
    
    if (!item) return null;

    return {
      title: item.title,
      authors: [], // ML no proporciona autor directamente
      publisher: item.seller.nickname || 'Unknown',
      publishedDate: new Date().getFullYear().toString(),
      description: item.description,
      coverImage: item.thumbnail,
      source: 'Mercado Libre',
      isbn: isbn,
      pageCount: undefined, // ML no proporciona cantidad de páginas
    };
  } catch (error) {
    console.log('❌ Mercado Libre error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
} 