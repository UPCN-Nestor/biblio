export type OnClose = () => void;
export type OnScan = (isbn: string) => void;
export interface BarcodeScannerProps {
    visible: boolean;
    onClose: OnClose;
    onScan: OnScan;
}
export declare const isValidISBN: (code: string) => boolean;
