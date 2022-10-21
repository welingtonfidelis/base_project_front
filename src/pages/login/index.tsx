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
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { formValidate } from "./helper/formValidate";
import { userStore } from "../../store/user";
import { ApplicationStorage } from "../../shared/enum/applicationStorage";
import { storage } from "../../services/storage";
import { FormProps } from "./types";
import { useLogin } from "../../services/requests/user";
import { useEffect } from "react";
import { toast } from "react-toastify";

const { RESET_PASSWORD, DASHBOARD } = ApplicationRoutes;
const { USER } = ApplicationStorage;

const initialFormValues = {
  user_name: "",
  password: "",
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { login, isLoading } = useLogin();
  const { updateUser } = userStore();
  const { set } = storage();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    login(values, {
      onSuccess(data) {
        console.log("data: ", data);

        if (data) {
          updateUser(data);
          set(USER, data);
          navigate(DASHBOARD);
        }
      },
      onError(error: any) {
        console.log("error: ", error);
        if (error?.response?.status === 404) {
          actions.setErrors({
            user_name: t("pages.login.input_user_email_invalid"),
          });
        }

        if (error?.response?.status === 401) {
          actions.setErrors({
            password: t("pages.login.input_password_invalid"),
          });
        }

        toast.error(t("pages.login.error_request_message"));
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
                <Field name="user_name">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.user_name && touched.user_name}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.login.input_user_email")}
                      />
                      <FormErrorMessage>{errors.user_name}</FormErrorMessage>
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
