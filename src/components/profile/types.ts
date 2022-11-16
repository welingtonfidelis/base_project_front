export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormProps {
  id: number;
  name: string;
  email: string;
  username: string;
}
