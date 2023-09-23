import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

import { FormProps, Props } from "./types";
import { formValidate } from "./helper/formValidate";
import { useUpdateUser } from "../../../../services/requests/user";
import { HttpServerMessageEnum } from "../../../../shared/enum/httpServerMessage";
import { Modal } from "../../../../components/modal";

const { INVALID_OLD_PASSWORD } = HttpServerMessageEnum;

const initialFormValues = {
  password: "",
  repeated_password: "",
};

export const UpdateUserPassword = (props: Props) => {
  const { isOpen, onClose, selectedUser } = props;
  const { t } = useTranslation();
  const { updateUser, isLoading } = useUpdateUser();
  const validateFormFields = formValidate();
  const toast = useToast();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (!selectedUser) return;

    updateUser(
      {
        id: Number(selectedUser.id),
        data: { password: values.password },
      },
      {
        onSuccess() {
          toast({
            title: t("components.update_user_password.success_request_message"),
          });

          onClose();
        },
        onError() {
          toast({
            title: t("components.update_user_password.error_request_message"),
            status: "error",
          });
        },
      }
    );
  };

  return (
    <Modal
      title={t("components.update_user_password.page_title")}
      onConfirm={() => {}}
      isOpen={isOpen}
      onClose={onClose}
      deactiveModalButtons
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={validateFormFields}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <strong>{selectedUser?.name}</strong>

            <Field name="password">
              {({ field }: any) => (
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel mt="2" mb="0.2">
                    {t("components.update_user_password.input_password")}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.update_user_password.input_password"
                    )}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="repeated_password">
              {({ field }: any) => (
                <FormControl
                  isInvalid={
                    !!errors.repeated_password && touched.repeated_password
                  }
                >
                  <FormLabel mt="2" mb="0.2">
                    {t(
                      "components.update_user_password.input_repeated_password"
                    )}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.update_user_password.input_repeated_password"
                    )}
                  />
                  <FormErrorMessage>
                    {errors.repeated_password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <ModalFooter paddingEnd={0}>
              <Button onClick={onClose} colorScheme="gray" marginEnd={"2"}>
                {t("generic.button_cancel")}
              </Button>
              <Button colorScheme="blue" isLoading={isLoading} type="submit">
                {t("generic.button_save")}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
