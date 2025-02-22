export interface BookData {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description?: string;
  coverImage?: string;
  source: string;
  isbn: string;
  pageCount?: number;
  categories?: string[];
} 