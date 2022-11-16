import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AlertConfirm } from "../../../../components/alertConfirm";
import { Props } from "./types";

export const Alert = (props: Props) => {
  const { newUserData, isOpenNewUser, onCloseNewUser } = props;
  const { t } = useTranslation();

  const newUserDescription = useMemo(() => {
    const { username, email, password } = newUserData;
    return (
      <>
        <span>{t("pages.user_new_edit.alert_description_new_user")}</span>
        <br />
        <br />
        <span>{t("pages.user_new_edit.input_username")}: </span>
        <strong>{username}</strong>
        <br />
        <span>{t("pages.user_new_edit.input_email")}: </span>
        <strong>{email}</strong>
        <br />
        <span>{t("pages.user_new_edit.input_password")}: </span>
        <strong>{password}</strong>
      </>
    );
  }, [newUserData]);

  return (
    <>
      <AlertConfirm
        title={t("pages.user_new_edit.alert_title_new_user")}
        description={newUserDescription}
        isOpen={isOpenNewUser}
        onClose={onCloseNewUser}
        onCancelText={t("generic.button_ok")}
      />
    </>
  );
};
