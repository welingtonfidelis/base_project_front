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
import { userRequests } from "../../services/requests/user/index_old";
import { FormProps } from "./types";

const initialFormValues = {
  email: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { resetPassword } = userRequests();

  const { t } = useTranslation();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { ok } = await resetPassword(values.email);

    if (ok) navigate(-1);

    actions.setSubmitting(false);
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
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field name="email">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.email && touched.email}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.reset_password.input_user_email")}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
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
