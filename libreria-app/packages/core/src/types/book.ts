export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  coverImage?: string;
  price: number;
  stock: number;
  aiSummary?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 