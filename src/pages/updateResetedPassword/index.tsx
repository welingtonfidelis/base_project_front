import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { PageHeaderWithoutMenu } from "../../components/pageHeaderWithoutMenu";
import { formValidate } from "./helper/formValidate";
import { FormProps } from "./types";
import { useUpdateResetedPassword } from "../../services/requests/user";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";
import { urlParams } from "../../services/util/urlParams";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import {
  ActionContainer,
  Container,
  Content,
  FormContainer,
  WellcomeMessageText,
} from "./styles";

const { INVALID_RESET_TOKEN } = HttpServerMessageEnum;
const { ROOT } = ApplicationRoutes;

const initialFormValues = {
  new_password: "",
  repeated_new_password: "",
};

export const UpdateResetedPassword = () => {
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { updateResetedPassword, isLoading } = useUpdateResetedPassword();
  const { getParams } = urlParams();
  const { t } = useTranslation();

  const params = getParams();

  const handleSubmit = async (values: FormProps) => {
    console.log("values: ", params, values);
    const payload = { new_password: values.new_password, token: params?.token };
    updateResetedPassword(payload, {
      onSuccess(_) {
        toast.success(
          t("pages.update_reseted_password.success_request_message")
        );

        navigate(ROOT);
      },
      onError(error) {
        const { message } = responseErrorHandler(error);
        console.log("message: ", message);

        if (message === INVALID_RESET_TOKEN.message) {
          toast.error(
            t("pages.update_reseted_password.error_request_token_message")
          );
        } else
          toast.error(t("pages.update_reseted_password.error_request_message"));
      },
    });
  };

  return (
    <Container>
      <Content>
        <PageHeaderWithoutMenu
          title={t("pages.update_reseted_password.page_title")}
        />

        <WellcomeMessageText>
          {t("pages.update_reseted_password.welcome_message")}
        </WellcomeMessageText>

        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="new_password">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.new_password && touched.new_password}
                    >
                      <FormLabel mt="2" mb="0.2">
                        {t(
                          "components.profile_change_password.input_new_password"
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t(
                          "components.profile_change_password.input_new_password"
                        )}
                      />
                      <FormErrorMessage>{errors.new_password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="repeated_new_password">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={
                        !!errors.repeated_new_password &&
                        touched.repeated_new_password
                      }
                    >
                      <FormLabel mt="2" mb="0.2">
                        {t(
                          "components.profile_change_password.input_repeated_new_password"
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t(
                          "components.profile_change_password.input_repeated_new_password"
                        )}
                      />
                      <FormErrorMessage>
                        {errors.repeated_new_password}
                      </FormErrorMessage>
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
