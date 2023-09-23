import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import {
  AvatarContent,
  AvatarIcon,
  AvatarImage,
  AvatarImageDelete,
} from "./styles";
import { formValidate } from "./helper/formValidate";
import { HttpServerMessageEnum } from "../../../../shared/enum/httpServerMessage";
import { FormProps, Props } from "./types";
import { userStore } from "../../../../store/user";
import {
  useGetProfile,
  useUpdateProfile,
} from "../../../../services/requests/user";
import { Modal } from "../../../modal";
import { Preloader } from "../../../preloader";
import { responseErrorHandler } from "../../../../shared/handlers/responseError";

const { USERNAME_ALREADY_USED, EMAIL_ALREADY_USED } = HttpServerMessageEnum;

const FORM_VALUES_IGNORE = ["id"];

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const [localProfileImage, setLocalProfileImage] = useState<File | null>();
  const [deleteProfileImage, setDeleteProfileImage] = useState(false);
  const { updateUser } = userStore();
  const { updateProfile, isLoading: isUpdateLoading } = useUpdateProfile();
  const { refetch, data, isLoading } = useGetProfile();
  const validateFormFields = formValidate();
  const toast = useToast();
  const formRef = useRef<any>();

  const initialFormValues = useMemo(() => {
    if (data) updateUser(data);

    return {
      id: data?.id || 0,
      name: data?.name || "",
      username: data?.username || "",
      email: data?.email || "",
    };
  }, [data]);

  const handleCloseModal = () => {
    setLocalProfileImage(null);
    setDeleteProfileImage(false);
    onClose();
  };

  const handleDeleteProfileImage = () => {
    if (localProfileImage) {
      setLocalProfileImage(null);
      return;
    }

    setDeleteProfileImage(true);
    if (data) data.image_url = "";
  };

  const handleAddProfileImage = (files: FileList) => {
    console.log("files: ", files);
    setLocalProfileImage(files[0]);
    setDeleteProfileImage(false);
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (!FORM_VALUES_IGNORE.includes(key)) {
        formData.set(key, value);
      }
    });

    if (localProfileImage) formData.append("file", localProfileImage);

    if (deleteProfileImage) formData.append("delete_image", "true");

    updateProfile(formData as any, {
      onSuccess() {
        toast({
          title: t("components.profile.success_request_message"),
        });

        handleCloseModal();

        refetch();
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
          title: t("components.profile.error_request_message"),
          status: "error",
        });
      },
    });
  };

  return (
    <Modal
      title={t("components.profile.page_title")}
      onConfirm={() => formRef.current?.handleSubmit()}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <Preloader isLoading={isLoading}>
        <Formik
          innerRef={formRef}
          initialValues={initialFormValues}
          validationSchema={validateFormFields}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <AvatarContent>
                <label htmlFor="image_file">
                  {localProfileImage || data?.image_url.length ? (
                    <AvatarImage
                      src={
                        localProfileImage
                          ? URL.createObjectURL(localProfileImage)
                          : data?.image_url
                      }
                    />
                  ) : (
                    <AvatarIcon />
                  )}
                  <Input
                    id="image_file"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      console.log("e: ", e);
                      handleAddProfileImage(
                        (e?.target?.files || []) as FileList
                      );
                    }}
                  />
                </label>

                {(localProfileImage || Boolean(data?.image_url.length)) && (
                  <AvatarImageDelete
                    title={t(
                      "components.profile_change_password.button_delete_image"
                    )}
                    onClick={handleDeleteProfileImage}
                  />
                )}
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

              <Field name="username">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_username")}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t("components.profile.input_username")}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_email")}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t("components.profile.input_email")}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Preloader>
    </Modal>
  );
};
