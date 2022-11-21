import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = (isUpdate: boolean) => {
  let validate: any = {
    name: Yup.string().required(i18n.t("generic.required_input_value")),
    username: Yup.string().required(i18n.t("generic.required_input_value")),
    email: Yup.string()
      .email(i18n.t("pages.user_new_edit.input_email_format_invalid"))
      .required(i18n.t("generic.required_input_value")),
    permissions: Yup.array()
      .min(1, i18n.t("generic.required_input_value"))
      .of(Yup.string()),
  };

  if (!isUpdate) {
    validate = {
      ...validate,
      password: Yup.string()
        .min(3, i18n.t("pages.user_new_edit.input_password_invalid_length"))
        .required(i18n.t("generic.required_input_value")),
      repeated_password: Yup.string()
        .required(i18n.t("generic.required_input_value"))
        .when("password", {
          is: (val: any) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            i18n.t("pages.user_new_edit.input_repeated_password_invalid")
          ),
        }),
    };
  }

  return Yup.object().shape(validate);
};
