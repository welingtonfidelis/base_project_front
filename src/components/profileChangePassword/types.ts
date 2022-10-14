export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormProps {
  old_password: string;
  new_password: string;
  repeated_new_password: string;
}
