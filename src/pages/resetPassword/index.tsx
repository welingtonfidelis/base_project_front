import { useTranslation } from "react-i18next";

import {
  ActionContainer,
  Container,
  Content,
  FormContainer,
  WellcomeMessageText,
} from "./styles";

import { PageHeaderWithoutMenu } from "../../components/pageHeaderWithoutMenu";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { formValidate } from "./helper/formValidate";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { FormProps } from "./types";
import { useResetPassword } from "../../services/requests/user";
import { toast } from "react-toastify";

const initialFormValues = {
  user_name: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { resetPassword, isLoading } = useResetPassword();

  const { t } = useTranslation();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    resetPassword(values, {
      onSuccess(_) {
        toast.success(t("pages.reset_password.success_request_message"));

        navigate(-1);
      },
      onError(error: any) {
        console.log("error: ", error);
        if (error?.response?.status === 404) {
          actions.setErrors({
            user_name: t("pages.login.input_user_email_invalid"),
          });
        }

        toast.error(t("pages.reset_password.error_request_message"));
      },
    });
  };

  return (
    <Container>
      <Content>
        <PageHeaderWithoutMenu title={t("pages.reset_password.page_title")} />

        <WellcomeMessageText>
          {t("pages.reset_password.welcome_message")}
        </WellcomeMessageText>

        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="user_name">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.user_name && touched.user_name}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.reset_password.input_user_email")}
                      />
                      <FormErrorMessage>{errors.user_name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {t("pages.reset_password.button_reset")}
                  </Button>
                </ActionContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Content>
    </Container>
  );
};
