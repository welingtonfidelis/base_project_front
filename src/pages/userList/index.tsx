import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import isEmpty from "lodash/isEmpty";
import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { useGetListUsers } from "../../services/requests/user";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import { Container, EditIconContent, MainContent } from "./styles";
import { User } from "../../domains/user";
import { urlParams } from "../../services/util/urlParams";
import { ListUsersPayload } from "../../services/requests/user/types";
import { Alert } from "./components/alert";
import { PageFilter } from "./components/pageFilter";
import { PageFilterType } from "./components/pageFilter/types";

const { USER_EDIT } = ApplicationRoutes;
const { PAGE, ID, NAME } = PageFilterType;

const initialFilterValues = {
  [PAGE]: 1,
  [ID]: "",
  [NAME]: "",
};

export const UserList = () => {
  const [pageFilter, setPageFilter] =
    useState<ListUsersPayload>(initialFilterValues);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { getParams, setParams } = urlParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isOpen: isOpenBlock,
    onOpen: onOpenBlock,
    onClose: onCloseBlock,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { getQueryKey, data, isLoading } = useGetListUsers(pageFilter);

  const handleOpenAlert = (user: User, type: "block" | "delete") => {
    switch (type) {
      case "block":
        onOpenBlock();
        break;

      default:
        onOpenDelete();
        break;
    }

    setSelectedUser(user);
  };

  const handleCloseAlert = (type: "block" | "delete") => {
    switch (type) {
      case "block":
        onCloseBlock();
        break;

      default:
        onCloseDelete();
        break;
    }

    setSelectedUser(null);
  };

  useEffect(() => {
    const urlPageParam = getParams();

    if (!isEmpty(urlPageParam)) {
      const filters: any = {};
      Object.entries(urlPageParam).forEach((item) => {
        const [key, value] = item;
        if (Object.values(PageFilterType).includes(key as any)) {
          filters[key] = value;
        }
      });

      setPageFilter(filters);
      return;
    }
  }, []);

  const handleChangePageFilter = (key: PageFilterType, value: string) => {
    setPageFilter((oldState) => {
      return {
        ...oldState,
        [key]: value,
      };
    });

    setParams(key, value);
  };

  const columnHeader = useMemo(
    () => t("pages.user_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];

    return data?.users.map((item) => [
      <Avatar name={item.name} />,
      item.name,
      item.email,
      item.is_blocked ? t("generic.button_yes") : t("generic.button_no"),
      <Menu>
        <MenuButton>
          <EditIconContent>
            <BsGearFill size={20} />
          </EditIconContent>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => navigate(USER_EDIT.replace(":id", String(item.id)))}
          >
            {t("pages.user_list.table_action_edit")}
          </MenuItem>
          <MenuItem
            color="yellow.500"
            onClick={() => handleOpenAlert(item, "block")}
          >
            {item.is_blocked
              ? t("pages.user_list.table_action_unblock")
              : t("pages.user_list.table_action_block")}
          </MenuItem>
          <MenuItem color="red" onClick={() => handleOpenAlert(item, "delete")}>
            {t("pages.user_list.table_action_delete")}
          </MenuItem>
        </MenuList>
      </Menu>,
    ]);
  }, [data]);

  return (
    <Container>
      <MainContent>
        <Preloader isLoading={isLoading}>
          <PageFilter
            pageFilter={pageFilter}
            handleChangePageFilter={handleChangePageFilter}
          />
          <Divider />
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={Number(pageFilter.page)}
        onPageChange={(page) => handleChangePageFilter(PAGE, String(page))}
        totalItems={data?.total || 0}
      />

      <Alert
        isOpenBlock={isOpenBlock}
        onCloseBlock={() => handleCloseAlert("block")}
        isOpenDelete={isOpenDelete}
        onCloseDelete={() => handleCloseAlert("delete")}
        selectedUser={selectedUser}
        queryKey={getQueryKey()}
      />
    </Container>
  );
};
