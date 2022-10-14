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
import { resetPasswordRequests } from "../../services/requests/resetPassword";

interface FormProps {
  email: string;
}

const initialFormValues = {
  email: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { resetPassword } = resetPasswordRequests();

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
            {(props) => (
              <Form>
                <Field name="email">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.reset_password.input_user_email")}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ActionContainer>
                  <Button
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
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
