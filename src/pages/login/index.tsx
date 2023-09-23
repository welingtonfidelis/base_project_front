import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";

import {
  ActionContainer,
  Container,
  Content,
  ForgotPasswordText,
  FormContainer,
  LogoContainer,
  WellcomeMessageText,
} from "./styles";

import logoImage from "../../assets/logo.png";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { formValidate } from "./helper/formValidate";
import { userStore } from "../../store/user";
import { FormProps } from "./types";
import { useLogin } from "../../services/requests/user";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";

const { RESET_PASSWORD, DASHBOARD } = ApplicationRoutes;
const { INVALID_USERNAME_OR_EMAIL, INVALID_PASSWORD } = HttpServerMessageEnum;

const initialFormValues = {
  username: "",
  password: "",
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { login, isLoading } = useLogin();
  const { updateUser } = userStore();
  const toast = useToast();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    login(values, {
      onSuccess(data) {
        if (data) {
          updateUser(data);
          navigate(DASHBOARD);
        }
      },
      onError(error) {
        const { message } = responseErrorHandler(error);

        if (message === INVALID_USERNAME_OR_EMAIL.message) {
          actions.setErrors({
            username: t("pages.login.input_user_email_invalid"),
          });
        }

        if (message === INVALID_PASSWORD.message) {
          actions.setErrors({
            password: t("pages.login.input_password_invalid"),
          });
        }

        toast({
          title: t("pages.login.error_request_message"),
          status: "error",
          duration: null,
        });
      },
    });
  };

  const handleResetPassword = () => {
    navigate(RESET_PASSWORD);
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

        <WellcomeMessageText>
          {t("pages.login.welcome_message")}
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
                        placeholder={t("pages.login.input_user_email")}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                      mb="2"
                    >
                      <Input
                        {...field}
                        type="password"
                        placeholder={t("pages.login.input_password")}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ForgotPasswordText onClick={handleResetPassword}>
                  {t("pages.login.forgot_password_text")}
                </ForgotPasswordText>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {t("pages.login.button_login")}
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
