export interface Props {
    title: string;
    onConfirmButtonText?: string;
    onCloseButtonText?: string;
    isOpen: boolean;
    onConfirmLoading?: boolean;
    deactiveModalButtons?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}