import { QueryKey } from "react-query";
import { User } from "../../../../domains/user";

export interface Props {
  isOpenBlock: boolean;
  onCloseBlock: () => void;
  isOpenDelete: boolean;
  onCloseDelete: () => void;

  selectedUser: User | null;
  queryKey: QueryKey;
}
