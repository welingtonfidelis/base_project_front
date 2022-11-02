import React from "react";

export interface Props {
    title: string;
    description: string | React.ReactElement;
    isOpen: boolean;
    isLoading?: boolean;
    onConfirmText?: string;
    onCancelText?: string;

    onConfirm?: () => void;
    onClose: () => void;
}