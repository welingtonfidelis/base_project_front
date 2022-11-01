import { ListUsersPayload } from "../../../../services/requests/user/types";

export enum PageFilterType {
  PAGE = "page",
  ID = "id",
  NAME = "name",
}

export interface Props {
  pageFilter: ListUsersPayload;
  handleChangePageFilter: (key: PageFilterType, value: string) => void;
}
