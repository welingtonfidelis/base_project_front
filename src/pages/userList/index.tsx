import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { useGetListUsers } from "../../services/requests/user";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import { Container, EditIconContent, MainContent } from "./styles";
import { User } from "../../domains/user";
import { Alert } from "./components/alert";
import { PageFilter } from "./components/pageFilter";
import { userListPageStore } from "../../store/userListPage";
import { UpdateUserPassword } from "./components/updateUserPassword";

const { USER_EDIT } = ApplicationRoutes;

export const UserList = () => {
  const { filters, updatePageNumber } = userListPageStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();
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
  const {
    isOpen: isOpenUpdatePassword,
    onOpen: onOpenUpdatePassword,
    onClose: onCloseUpdatePassword,
  } = useDisclosure();
  const { getQueryKey, data, isLoading, error } = useGetListUsers(filters);

  if (error) {
    toast({
      title: t("pages.user_list.error_request_delete_message"),
      status: "error",
    });
  }

  const handleOpenAlert = (
    user: User,
    type: "block" | "delete" | "password"
  ) => {
    switch (type) {
      case "block":
        onOpenBlock();
        break;

      case "password":
        onOpenUpdatePassword();
        break;

      default:
        onOpenDelete();
        break;
    }

    setSelectedUser(user);
  };

  const handleCloseAlert = (type: "block" | "delete" | "password") => {
    switch (type) {
      case "block":
        onCloseBlock();
        break;

      case "password":
        onCloseUpdatePassword();
        break;

      default:
        onCloseDelete();
        break;
    }

    setSelectedUser(null);
  };

  // ===> TODO get/set filters param URL
  // useEffect(() => {
  //   const urlPageParam = getParams();

  //   if (!isEmpty(urlPageParam)) {
  //     Object.entries(urlPageParam).forEach((item) => {
  //       const [key, value] = item;
  //       if (Object.values(filtersType).includes(key as any)) {
  //         console.log('key: ', key, value);
  //       }
  //     });

  //     return;
  //   }

  //   setMultipleParams(filters);
  // }, [filters]);

  const columnHeader = useMemo(
    () => t("pages.user_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];

    return data?.users.map((item) => [
      <Avatar name={item.name} src={item.image_url} />,
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
            onClick={() => handleOpenAlert(item, "password")}
          >
            {t("pages.user_list.table_action_update_password")}
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
          <PageFilter />
          <Divider />
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={filters.page}
        onPageChange={updatePageNumber}
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

      <UpdateUserPassword
        isOpen={isOpenUpdatePassword}
        onClose={() => handleCloseAlert("password")}
        selectedUser={selectedUser}
      />
    </Container>
  );
};
