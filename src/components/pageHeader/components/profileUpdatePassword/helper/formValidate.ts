import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    old_password: Yup.string().required(i18n.t("generic.required_input_value")),
    new_password: Yup.string()
      .min(
        3,
        i18n.t(
          "components.profile_change_password.input_password_invalid_length"
        )
      )
      .required(i18n.t("generic.required_input_value")),
    repeated_new_password: Yup.string()
      .required(i18n.t("generic.required_input_value"))
      .when("new_password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("new_password")],
          i18n.t(
            "components.profile_change_password.input_repeated_new_password_invalid"
          )
        ),
      }),
  });
};
