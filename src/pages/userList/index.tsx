import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import {
  useDeleteUser,
  useGetListUsers,
  useUpdateUser,
} from "../../services/requests/user";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import { Container, EditIconContent, MainContent } from "./styles";
import { AlertConfirm } from "../../components/alertConfirm";
import { User } from "../../domains/user";
import { toast } from "react-toastify";
import { useQueryData } from "../../shared/hooks/usequeryData";
const { USER_DETAIL } = ApplicationRoutes;

export const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlockUser, setSelectedBlockUser] = useState<User | null>();
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>();
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
  const { getQueryKey, data, isLoading } = useGetListUsers({
    page: currentPage - 1,
  });
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { deleteUser, isLoading: isLoadingDeleteUser } = useDeleteUser();
  const { setStoreData, deleteStoreData } = useQueryData(
    getQueryKey(),
    "users"
  );

  const handleOpenAlertBlockUser = (user: User) => {
    setSelectedBlockUser(user);
    onOpenBlock();
  };

  const handleOpenAlertDeleteUser = (user: User) => {
    setSelectedDeleteUser(user);
    onOpenDelete();
  };

  const handleBlockUser = useCallback(() => {
    if (!selectedBlockUser) return;

    const { id } = selectedBlockUser;
    const is_blocked = !selectedBlockUser.is_blocked;
    updateUser(
      { id, data: { is_blocked } },
      {
        onSuccess() {
          toast.success(t("pages.user_list.success_request_block_message"));
          setStoreData(
            {
              is_blocked,
            },
            [id],
            "id"
          );

          onCloseBlock();
          setSelectedBlockUser(null);
        },
        onError() {
          toast.error(t("pages.user_list.error_request_block_message"));
        },
      }
    );
  }, [selectedBlockUser]);

  const handleDeleteUser = useCallback(() => {
    if (!selectedDeleteUser) return;

    const { id } = selectedDeleteUser;
    deleteUser(
      { id },
      {
        onSuccess() {
          toast.success(t("pages.user_list.success_request_delete_message"));
          deleteStoreData([id], "id");

          onCloseDelete();
          setSelectedDeleteUser(null);
        },
        onError() {
          toast.error(t("pages.user_list.error_request_delete_message"));
        },
      }
    );
  }, [selectedDeleteUser]);

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
            onClick={() =>
              navigate(USER_DETAIL.replace(":id", String(item.id)))
            }
          >
            {t("pages.user_list.table_action_edit")}
          </MenuItem>
          <MenuItem
            color="yellow.500"
            onClick={() => handleOpenAlertBlockUser(item)}
          >
            {item.is_blocked
              ? t("pages.user_list.table_action_unblock")
              : t("pages.user_list.table_action_block")}
          </MenuItem>
          <MenuItem color="red" onClick={() => handleOpenAlertDeleteUser(item)}>
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
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={data?.total || 0}
      />

      <AlertConfirm
        title={
          selectedBlockUser?.is_blocked
            ? t("pages.user_list.alert_title_unblock_user")
            : t("pages.user_list.alert_title_block_user")
        }
        description={
          selectedBlockUser?.is_blocked
            ? t("pages.user_list.alert_description_unblock_user", {
                user_name: selectedBlockUser?.user_name,
              })
            : t("pages.user_list.alert_description_block_user", {
                user_name: selectedBlockUser?.user_name,
              })
        }
        isOpen={isOpenBlock}
        onClose={onCloseBlock}
        onConfirm={handleBlockUser}
        isLoading={isLoadingUpdateUser}
      />

      <AlertConfirm
        title={t("pages.user_list.alert_title_delete_user")}
        description={t("pages.user_list.alert_description_delete_user", {
          user_name: selectedDeleteUser?.name,
        })}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onConfirm={handleDeleteUser}
        isLoading={isLoadingDeleteUser}
      />
    </Container>
  );
};
