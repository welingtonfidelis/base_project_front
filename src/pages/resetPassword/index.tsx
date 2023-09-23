import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";

import { PageHeaderWithoutMenu } from "../../components/pageHeaderWithoutMenu";
import { formValidate } from "./helper/formValidate";
import { FormProps } from "./types";
import { useResetPassword } from "../../services/requests/user";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";

import {
  ActionContainer,
  Container,
  Content,
  FormContainer,
  WellcomeMessageText,
} from "./styles";

const { INVALID_USERNAME_OR_EMAIL } = HttpServerMessageEnum;

const initialFormValues = {
  username: "",
  language: "pt",
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { resetPassword, isLoading } = useResetPassword();
  const toast = useToast();

  const { t } = useTranslation();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    console.log("values: ", values);
    resetPassword(values, {
      onSuccess(_) {
        toast({
          title: t("pages.reset_password.success_request_message"),
        });

        navigate(-1);
      },
      onError(error) {
        const { message } = responseErrorHandler(error);

        if (message === INVALID_USERNAME_OR_EMAIL.message) {
          actions.setErrors({
            username: t("pages.reset_password.input_user_email_invalid"),
          });
        }

        toast({
          title: t("pages.reset_password.error_request_message"),
          status: "error",
        });
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
                <Field name="username">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.username && touched.username}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.reset_password.input_user_email")}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {t("generic.button_send")}
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
