export interface Props {
    title: string;
    onConfirmButtonText?: string;
    onCloseButtonText?: string;
    isOpen: boolean;
    onConfirmLoading?: boolean;
    showActionButtons?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}