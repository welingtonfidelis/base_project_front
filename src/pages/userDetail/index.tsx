import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/pageHeader";
import { AvatarContent } from "../../components/pageHeader/components/profile/styles";
import { Preloader } from "../../components/preloader";
import { useGetListPermissions } from "../../services/requests/permission";
import {
  useCreateUser,
  useGetUserById,
  useUpdateUser,
} from "../../services/requests/user";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { BordedContainer } from "../../shared/styles/input";
import { Alert } from "./components/alert";
import { formValidate } from "./helper/formValidate";
import {
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
} from "./styles";
import { FormProps } from "./types";

const { USERNAME_ALREADY_USED, EMAIL_ALREADY_USED } = HttpServerMessageEnum;

const FORM_UPDATE_VALUES_IGNORE = ["password", "repeated_password"];
const FORM_CREATE_VALUES_IGNORE = ["repeated_password"];

export const UserDetail = () => {
  const params = useParams();
  const id = params.id;
  const validateFormFields = formValidate(Boolean(id));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useGetUserById({ id: Number(id) });
  const toast = useToast();
  const { data: dataPermissions, isLoading: isLoadingGetPermissions } =
    useGetListPermissions();
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { createUser, isLoading: isLoadingCreateUser } = useCreateUser();
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const {
    isOpen: isOpenNewUser,
    onOpen: onOpenNewUser,
    onClose: onCloseNewUser,
  } = useDisclosure();

  const initialFormValues = useMemo(() => {
    return {
      name: data?.name || "",
      username: data?.username || "",
      email: data?.email || "",
      is_blocked: data?.is_blocked || false,
      password: "",
      repeated_password: "",
      permissions: data?.permissions || [],
    };
  }, [data]);

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (id) {
      const data: any = {};
      Object.entries(values).forEach(([key, value]) => {
        if (!FORM_UPDATE_VALUES_IGNORE.includes(key)) {
          data[key] = value;
        }
      });

      updateUser(
        { id: Number(id), data },
        {
          onSuccess() {
            toast({
              title: t("pages.user_new_edit.success_request_edit_message", {
                username: values.name,
              }),
            });

            navigate(-1);
          },
          onError(error) {
            const { message } = responseErrorHandler(error);

            if (message === USERNAME_ALREADY_USED.message) {
              actions.setErrors({
                username: t("components.profile.input_username_already_used"),
              });
            }

            if (message === EMAIL_ALREADY_USED.message) {
              actions.setErrors({
                email: t("components.profile.input_email_already_used"),
              });
            }
            toast({
              title: t("pages.user_new_edit.error_request_edit_message"),
              status: "error",
            });
          },
        }
      );

      return;
    }

    const data: any = {};
    Object.entries(values).forEach(([key, value]) => {
      if (!FORM_CREATE_VALUES_IGNORE.includes(key)) {
        data[key] = value;
      }
    });
    createUser(data, {
      onSuccess({ email, username, password }) {
        setNewUserData({
          username,
          email,
          password,
        });
        onOpenNewUser();
      },
      onError(error) {
        const { message } = responseErrorHandler(error);

        if (message === USERNAME_ALREADY_USED.message) {
          actions.setErrors({
            username: t("components.profile.input_username_already_used"),
          });
        }

        if (message === EMAIL_ALREADY_USED.message) {
          actions.setErrors({
            email: t("components.profile.input_email_already_used"),
          });
        }

        toast({
          title: t("pages.user_new_edit.error_request_new_message"),
          status: "error",
        });
      },
    });
  };

  const handleCloseAlert = () => {
    onCloseNewUser();
    navigate(-1);
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
                      src={data?.image_url} //https://bit.ly/dan-abramov
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

                  <Field name="username">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.username && touched.username}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.user_new_edit.input_username")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.user_new_edit.input_username")}
                        />
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
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

                  {!id && (
                    <>
                      <Field name="password">
                        {({ field }: any) => (
                          <FormControl
                            isInvalid={!!errors.password && touched.password}
                          >
                            <FormLabel mt="2" mb="0.2">
                              {t("pages.user_new_edit.input_password")}
                            </FormLabel>
                            <Input
                              {...field}
                              type="password"
                              placeholder={t(
                                "pages.user_new_edit.input_password"
                              )}
                            />
                            <FormErrorMessage>
                              {errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="repeated_password">
                        {({ field }: any) => (
                          <FormControl
                            isInvalid={
                              !!errors.repeated_password &&
                              touched.repeated_password
                            }
                          >
                            <FormLabel mt="2" mb="0.2">
                              {t("pages.user_new_edit.input_repeated_password")}
                            </FormLabel>
                            <Input
                              {...field}
                              type="password"
                              placeholder={t(
                                "pages.user_new_edit.input_repeated_password"
                              )}
                            />
                            <FormErrorMessage>
                              {errors.repeated_password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </>
                  )}

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
                                key={item}
                                marginEnd={6}
                                value={item}
                                defaultChecked={data?.permissions?.includes(
                                  item
                                )}
                              >
                                {item}
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

      <Alert
        newUserData={newUserData}
        isOpenNewUser={isOpenNewUser}
        onCloseNewUser={handleCloseAlert}
      />
    </Container>
  );
};
