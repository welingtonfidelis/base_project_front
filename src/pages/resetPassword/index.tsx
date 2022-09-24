import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  ActionContainer,
  Container,
  Content,
  FormContainer,
  InputContainer,
  WellcomeMessageText,
  WrongUserPassword,
} from "./styles";

import { PageHeader } from "../../components/pageHeader";
import { PrimaryButton } from "../../components/button";
import { useNavigate } from "react-router-dom";

interface FormProps {
  user_name: string;
}

export const ResetPassword = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const handleResetPassword = handleSubmit((data) => {
    setLoadingButton(true);
    console.log("data: ", data);

    toast.success(t("pages.reset_password.success_request_message"), { autoClose: 7000 });
    navigate(-1);

    setLoadingButton(false);
  });

  return (
    <Container>
      <Content>
        <PageHeader title={t("pages.reset_password.page_title")} />

        <WellcomeMessageText>
          {t("pages.reset_password.welcome_message")}
        </WellcomeMessageText>

        <FormContainer onSubmit={handleResetPassword}>
          <InputContainer>
            <TextField
              id="user_name"
              label={t("pages.reset_password.input_user_email")}
              variant="outlined"
              size="small"
              fullWidth
              {...register("user_name", {
                required: t("generic.required_input_value"),
              })}
              error={!!errors.user_name}
              helperText={errors.user_name?.message}
            />
          </InputContainer>

          <WrongUserPassword>
            {t("pages.reset_password.wrong_user_password_text")}
          </WrongUserPassword>

          <ActionContainer>
            <PrimaryButton type="submit" loading={loadingButton}>
              {t("pages.reset_password.button_reset")}
            </PrimaryButton>
          </ActionContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};
