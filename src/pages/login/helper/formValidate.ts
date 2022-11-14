import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    username: Yup.string().required(i18n.t("generic.required_input_value")),
    password: Yup.string().required(i18n.t("generic.required_input_value"))
  });
};
