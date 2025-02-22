// Remove React dependency by using plain function types
export type OnClose = () => void;
export type OnScan = (isbn: string) => void;

export interface BarcodeScannerProps {
  visible: boolean;
  onClose: OnClose;
  onScan: OnScan;
}

export const isValidISBN = (code: string): boolean => {
  return /^(978|979)/.test(code);
}; 