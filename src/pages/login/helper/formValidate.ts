import i18n from "i18next";

export const formValidate = () => {
  const validateEmailField = (value: string | undefined) => {
    let error;
    if (!value) {
      error = i18n.t("generic.required_input_value");
    }
    return error;
  };

  const validatePasswordField = (value: string | undefined) => {
    let error;
    if (!value) {
      error = i18n.t("generic.required_input_value");
    }
    return error;
  };

  return { validateEmailField, validatePasswordField };
};
