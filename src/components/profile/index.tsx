import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { Modal } from "../modal";
import { FormProps, Props } from "./types";
import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import { userStore } from "../../store/user";
import { AvatarContent } from "./styles";
import { formValidate } from "./helper/formValidate";
import { useGetProfile, useUpdateProfile } from "../../services/requests/user";
import { Preloader } from "../preloader";

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { updateUser } = userStore();
  const { updateProfile, isLoading: isUpdateLoading } = useUpdateProfile();
  const { refetch, data, isLoading } = useGetProfile();
  const validateFormFields = formValidate();

  const initialFormValues = useMemo(() => {
    return {
      id: data?.id || 0,
      name: data?.name || "",
      user_name: data?.user_name || "",
      email: data?.email || "",
    };
  }, [data]);

  const handleSubmit = async (values: FormProps) => {
    updateProfile(values, {
      onSuccess() {
        toast.success(t("components.profile.success_request_message"));
        updateUser(values);
        refetch();
        onClose();
      },
      onError() {
        toast.error(t("components.profile.error_request_message"));
      },
    });
  };

  return (
    <Modal
      title={t("components.profile.page_title")}
      onConfirm={() => {}}
      isOpen={isOpen}
      onClose={onClose}
      deactiveModalButtons
    >
      <Preloader isLoading={isLoading}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validateFormFields}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <AvatarContent>
                <Avatar
                  name={data?.name}
                  src="" //https://bit.ly/dan-abramov
                  size={"xl"}
                  mb="3"
                />
              </AvatarContent>

              <Field name="id">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_id")}
                    </FormLabel>
                    <Input
                      {...field}
                      disabled
                      placeholder={t("components.profile.input_id")}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="name">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_name")}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t("components.profile.input_name")}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="user_name">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_user_name")}
                    </FormLabel>
                    <Input
                      {...field}
                      disabled
                      placeholder={t("components.profile.input_user_name")}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_email")}
                    </FormLabel>
                    <Input
                      {...field}
                      disabled
                      placeholder={t("components.profile.input_email")}
                    />
                  </FormControl>
                )}
              </Field>

              <ModalFooter paddingEnd={0}>
                <Button onClick={onClose} colorScheme="gray" marginEnd={"2"}>
                  {t("generic.button_cancel")}
                </Button>
                <Button
                  colorScheme="blue"
                  isLoading={isUpdateLoading}
                  type="submit"
                >
                  {t("generic.button_save")}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Preloader>
    </Modal>
  );
};
