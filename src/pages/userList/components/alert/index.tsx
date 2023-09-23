import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { AlertConfirm } from "../../../../components/alertConfirm";
import {
  useDeleteUser,
  useUpdateUser,
} from "../../../../services/requests/user";
import { useQueryData } from "../../../../shared/hooks/usequeryData";
import { Props } from "./types";
import { useToast } from "@chakra-ui/react";

export const Alert = (props: Props) => {
  const {
    selectedUser,
    queryKey,
    isOpenBlock,
    onCloseBlock,
    isOpenDelete,
    onCloseDelete,
  } = props;
  const { t } = useTranslation();
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { deleteUser, isLoading: isLoadingDeleteUser } = useDeleteUser();
  const { setStoreData, deleteStoreData } = useQueryData(queryKey, "users");
  const toast = useToast();

  const handleBlockUser = useCallback(() => {
    if (!selectedUser) return;

    const { id } = selectedUser;
    const is_blocked = !selectedUser.is_blocked;
    updateUser(
      { id, data: { is_blocked } },
      {
        onSuccess() {
          toast({
            title: t("pages.user_list.success_request_block_message"),
          });

          setStoreData(
            {
              is_blocked,
            },
            [id],
            "id"
          );

          onCloseBlock();
        },
        onError() {
          toast({
            title: t("pages.user_list.error_request_block_message"),
            status: "error",
          });
        },
      }
    );
  }, [selectedUser]);

  const handleDeleteUser = useCallback(() => {
    if (!selectedUser) return;

    const { id } = selectedUser;
    deleteUser(
      { id },
      {
        onSuccess() {
          toast({ title: t("pages.user_list.success_request_delete_message") });
          deleteStoreData([id], "id");

          onCloseDelete();
        },
        onError() {
          toast({
            title: t("pages.user_list.error_request_delete_message"),
            status: "error",
          });
        },
      }
    );
  }, [selectedUser]);

  return (
    <>
      <AlertConfirm
        title={
          selectedUser?.is_blocked
            ? t("pages.user_list.alert_title_unblock_user")
            : t("pages.user_list.alert_title_block_user")
        }
        description={
          selectedUser?.is_blocked
            ? t("pages.user_list.alert_description_unblock_user", {
                name: selectedUser?.name,
              })
            : t("pages.user_list.alert_description_block_user", {
                name: selectedUser?.name,
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
          name: selectedUser?.name,
        })}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onConfirm={handleDeleteUser}
        isLoading={isLoadingDeleteUser}
      />
    </>
  );
};
