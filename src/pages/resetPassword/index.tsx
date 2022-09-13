import TextField from "@mui/material/TextField";
import Button from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import {
  ActionContainer,
  Container,
  Content,
  ForgotPasswordText,
  FormContainer,
  InputContainer,
  LogoContainer,
  WellcomeMessageText,
  WrongUserPassword,
} from "./styles";

import logoImage from "../../assets/logo.png";

interface FormProps {
  user_name: string;
}

export const ResetPassword = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const handleResetPassword = handleSubmit((data) => {
    setLoadingButton(true);
    console.log("data: ", data);
    setLoadingButton(false);
  });

  return (
    <Container>
      <Content>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

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
              {...register("user_name", {
                required: t("generic.required_input_value"),
              })}
              fullWidth
              error={!!errors.user_name}
              helperText={errors.user_name?.message}
            />
          </InputContainer>

          <WrongUserPassword>
            {t("pages.reset_password.wrong_user_password_text")}
          </WrongUserPassword>

          <ActionContainer>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              loading={loadingButton}
            >
              {t("pages.reset_password.button_reset")}
            </Button>
          </ActionContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};
