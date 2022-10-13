import i18n from "i18next";

export const formValidate = () => {
  const validateNameField = (value: string | undefined) => {
    let error;
    if (!value) {
      error = i18n.t("generic.required_input_value");
    }
    return error;
  };

  return { validateNameField };
};
