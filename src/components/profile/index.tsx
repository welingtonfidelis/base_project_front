import { useTranslation } from "react-i18next";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  useFormikContext,
  FormikProps,
} from "formik";

import { Modal } from "../modal";
import { FormProps, Props } from "./types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  ModalFooter,
  useEditable,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { delay } from "../../services/util/delayFunction";
import { ProfileRequests } from "../../services/requests/profile";

const initialFormValues = {
  name: "",
  email: "",
};

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<FormProps>>(null);
  const { updateProfile } = ProfileRequests();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { ok, data } = await updateProfile(values);

    actions.setSubmitting(false);

    if (ok) {
      onClose();
    }
  };

  return (
    <Modal
      title="Perfil"
      onConfirm={() => formRef?.current?.handleSubmit()}
      isOpen={isOpen}
      onClose={onClose}
      deactiveModalButtons
    >
      <div>
        <Formik
          innerRef={formRef}
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="name" validate={() => {}}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb="2"
                  >
                    <Input
                      {...field}
                      placeholder={t("pages.login.input_user_name")}
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={() => {}}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb="2"
                  >
                    <Input
                      {...field}
                      disabled
                      placeholder={t("pages.login.input_email")}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
      </div>
    </Modal>
  );
};
