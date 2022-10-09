export interface Props {
    title: string;
    description: string;
    isOpen: boolean;
    
    onConfirm: () => void;
    onClose: () => void;
}