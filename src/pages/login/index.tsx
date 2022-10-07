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
import { loginRequests } from "../../services/requests/login";
import { userStore } from "../../store/user";

interface FormProps {
  email: string;
  password: string;
}

const { RESET_PASSWORD, DASHBOARD } = ApplicationRoutes;

const initialFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { validateEmailField, validatePasswordField } = formValidate();
  const { login } = loginRequests();
  const { updateUser } = userStore();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { ok, data } = await login(values.email, values.password);
    actions.setSubmitting(false);
    
    if (ok && data) {
      updateUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate(DASHBOARD);
    }
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
          <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
            {(props) => (
              <Form>
                <Field name="email" validate={validateEmailField}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.login.input_user_email")}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatePasswordField}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.login.input_password")}
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ForgotPasswordText onClick={handleResetPassword}>
                  {t("pages.login.forgot_password_text")}
                </ForgotPasswordText>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
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
