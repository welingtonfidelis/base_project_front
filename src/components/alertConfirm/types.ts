export interface Props {
    title: string;
    description: string;
    isOpen: boolean;
    isLoading?: boolean;
    
    onConfirm: () => void;
    onClose: () => void;
}