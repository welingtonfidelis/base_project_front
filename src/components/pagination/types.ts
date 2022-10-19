export interface Props {
    totalItems: number;
    currentPage: number;
    onPageChange: (e: number) => void;
    itemsPerPage?: number;
}