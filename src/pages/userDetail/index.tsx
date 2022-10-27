import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import { AvatarContent } from "../../components/profile/styles";
import { useGetUserById } from "../../services/requests/user";
import { formValidate } from "./helper/formValidate";
import {
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
} from "./styles";
import { FormProps } from "./types";

export const UserDetail = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetUserById({ id: Number(id) });
  const validateFormFields = formValidate();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log("data: ", data);

  const initialFormValues = useMemo(() => {
    return {
      id: data?.id || 0,
      name: data?.name || "",
      user_name: data?.user_name || "",
      email: data?.email || "",
      permissions: data?.permissions || [],
    };
  }, [data]);

  const handleSubmit = async (values: FormProps) => {
    console.log("values: ", values);
    // updateProfile(values, {
    //   onSuccess() {
    //     toast.success(t("pages.user_new_edit.success_request_message"));
    //     updateUser(values);
    //     refetch();
    //     onClose();
    //   },
    //   onError() {
    //     toast.error(t("pages.user_new_edit.error_request_message"));
    //   },
    // });
  };

  return (
    <Container>
      <PageHeader
        title={
          id
            ? t("pages.user_new_edit.page_edit_title")
            : t("pages.user_new_edit.page_new_title")
        }
      />

      <Preloader isLoading={isLoading}>
        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <FomrInputContainer>
                  <AvatarContent>
                    <Avatar
                      name={values.name}
                      src="" //https://bit.ly/dan-abramov
                      size={"xl"}
                      mb="3"
                    />
                  </AvatarContent>

                  {id && (
                    <Field name="id">
                      {({ field }: any) => (
                        <FormControl>
                          <FormLabel mt="2" mb="0.2">
                            {t("pages.user_new_edit.page_id")}
                          </FormLabel>
                          <Input
                            {...field}
                            disabled
                            placeholder={t("pages.user_new_edit.page_id")}
                          />
                        </FormControl>
                      )}
                    </Field>
                  )}

                  <Field name="name">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_name")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.user_new_edit.input_name")}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="user_name">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.user_name && touched.user_name}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_user_name")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.user_new_edit.input_user_name")}
                        />
                        <FormErrorMessage>{errors.user_name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_email")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.user_new_edit.input_email")}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </FomrInputContainer>

                <FormButtonContainer>
                  <Button onClick={() => navigate(-1)}>
                    {t("generic.button_cancel")}
                  </Button>

                  <Button colorScheme="blue" isLoading={false} type="submit">
                    {t("generic.button_save")}
                  </Button>
                </FormButtonContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Preloader>
    </Container>
  );
};
