import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";

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
import { ProfileRequests } from "../../services/requests/profile";
import { userStore } from "../../store/user";
import { AvatarContent } from "./styles";
import { formValidate } from "./helper/formValidate";

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { user: userOnStore, updateUser } = userStore();
  const { updateProfile } = ProfileRequests();
  const { validateNameField } = formValidate();

  const initialFormValues = {
    name: userOnStore.name,
    email: userOnStore.email,
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { ok } = await updateProfile(values);

    actions.setSubmitting(false);

    if (ok) {
      updateUser(values);
      onClose();
    }
  };

  return (
    <Modal
      title="Perfil"
      onConfirm={() => {}}
      isOpen={isOpen}
      onClose={onClose}
      deactiveModalButtons
    >
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <AvatarContent>
              <Avatar
                name={userOnStore.name}
                src="" //https://bit.ly/dan-abramov
                size={"xl"}
                mb="3"
              />
            </AvatarContent>

            <Field name="name" validate={validateNameField}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  // mb="2"
                >
                  <FormLabel mt="2" mb="0.2">
                    {t("components.profile.input_name")}
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder={t("components.profile.input_name")}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }: any) => (
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
                isLoading={props.isSubmitting}
                type="submit"
              >
                {t("generic.button_save")}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
