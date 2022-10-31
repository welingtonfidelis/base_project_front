import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import isEmpty from "lodash/isEmpty";
import {
  Avatar,
  Button,
  Divider,
  Input,
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

import {
  Container,
  EditIconContent,
  MainContent,
  SearchInputContent,
} from "./styles";
import { AlertConfirm } from "../../components/alertConfirm";
import { User } from "../../domains/user";
import { toast } from "react-toastify";
import { useQueryData } from "../../shared/hooks/usequeryData";
import { urlParams } from "../../services/util/urlParams";
import { ListUsersPayload } from "../../services/requests/user/types";
import { PageFilterType } from "./types";

const { USER_EDIT, USER_NEW } = ApplicationRoutes;
const { PAGE, ID, NAME } = PageFilterType;

const initialFilterValues = {
  [PAGE]: 1,
  [ID]: "",
  [NAME]: "",
};

export const UserList = () => {
  const [pageFilter, setPageFilter] =
    useState<ListUsersPayload>(initialFilterValues);
  const [selectedBlockUser, setSelectedBlockUser] = useState<User | null>();
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>();
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

  const handleChangePageFilter = (key: PageFilterType, value: string) => {
    setPageFilter((oldState) => {
      return {
        ...oldState,
        [key]: value,
      };
    });

    console.log("key: ", key, value);
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
          <SearchInputContent>
            <DebounceInput
              debounceTimeout={500}
              placeholder={t("pages.user_list.input_search_id")}
              type="number"
              marginEnd={3}
              maxWidth={40}
              value={pageFilter[ID]}
              onChange={(e) => handleChangePageFilter(ID, e.target.value)}
              element={(field: any) => <Input {...field} />}
            />

            <DebounceInput
              debounceTimeout={500}
              placeholder={t("pages.user_list.input_search_name")}
              marginEnd={3}
              value={pageFilter[NAME]}
              onChange={(e) => handleChangePageFilter(NAME, e.target.value)}
              element={(field: any) => <Input {...field} />}
            />
            <Button
              minWidth={32}
              colorScheme="blue"
              onClick={() => navigate(USER_NEW)}
            >
              {t("pages.user_list.button_new_user")}
            </Button>
          </SearchInputContent>
          <Divider />
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={Number(pageFilter.page)}
        onPageChange={(page) => handleChangePageFilter(PAGE, String(page))}
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
