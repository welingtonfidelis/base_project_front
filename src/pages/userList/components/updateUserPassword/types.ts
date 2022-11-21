import { User } from "../../../../domains/user";

export interface Props {
  isOpen: boolean;
  onClose: () => void;

  selectedUser: User | null;
}

export interface FormProps {
  password: string;
  repeated_password: string;
}
