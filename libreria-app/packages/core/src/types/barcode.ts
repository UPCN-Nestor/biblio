export interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (isbn: string) => void;
}

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  coverImage?: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
} 