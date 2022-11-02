import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import { AvatarContent } from "../../components/profile/styles";
import { useGetListPermissions } from "../../services/requests/permission";
import {
  useCreateUser,
  useGetUserById,
  useUpdateUser,
} from "../../services/requests/user";
import { BordedContainer } from "../../shared/stytes/input";
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
  const validateFormFields = formValidate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useGetUserById({ id: Number(id) });
  const { data: dataPermissions, isLoading: isLoadingGetPermissions } =
    useGetListPermissions();
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { createUser, isLoading: isLoadingCreateUser } = useCreateUser();

  const initialFormValues = useMemo(() => {
    return {
      name: data?.name || "",
      user_name: data?.user_name || "",
      email: data?.email || "",
      is_blocked: data?.is_blocked || false,
      permissions: data?.permissions || [],
    };
  }, [data]);

  const handleSubmit = async (values: FormProps) => {
    if (id) {
      updateUser(
        { id: Number(id), data: values },
        {
          onSuccess() {
            toast.success(
              t("pages.user_new_edit.success_request_edit_message", {
                user_name: values.name,
              })
            );
            navigate(-1);
          },
          onError() {
            toast.error(t("pages.user_new_edit.error_request_edit_message"));
          },
        }
      );

      return;
    }

    createUser(values, {
      onSuccess() {
        toast.success(
          t("pages.user_new_edit.success_request_new_message", {
            user_name: values.name,
          })
        );
        navigate(-1);
      },
      onError() {
        toast.error(t("pages.user_new_edit.error_request_new_message"));
      },
    });
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
                    <FormControl>
                      <FormLabel mt="2" mb="0.2">
                        {t("pages.user_new_edit.input_id")}
                      </FormLabel>
                      <Input
                        value={id}
                        disabled
                        placeholder={t("pages.user_new_edit.input_id")}
                      />
                    </FormControl>
                  )}

                  <Field name="is_blocked">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_is_blocked")}
                        </FormLabel>
                        <BordedContainer>
                          <Switch {...field} isChecked={field.value} />
                        </BordedContainer>
                      </FormControl>
                    )}
                  </Field>

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

                  <Field name="permissions">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.permissions && touched.permissions}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_permissions")}
                        </FormLabel>
                        <BordedContainer>
                          {dataPermissions?.map((item) => {
                            return (
                              <Checkbox
                                {...field}
                                key={item.id}
                                marginEnd={6}
                                value={item.value}
                                defaultChecked={data?.permissions?.includes(
                                  item.value
                                )}
                              >
                                {item.name}
                              </Checkbox>
                            );
                          })}
                        </BordedContainer>
                        <FormErrorMessage>
                          {errors.permissions}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </FomrInputContainer>

                <FormButtonContainer>
                  <Button onClick={() => navigate(-1)}>
                    {t("generic.button_cancel")}
                  </Button>

                  <Button
                    colorScheme="blue"
                    isLoading={isLoadingUpdateUser || isLoadingCreateUser}
                    type="submit"
                  >
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
