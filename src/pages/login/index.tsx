import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { ApplicationRoutes } from "../../config/applicationRoutes";
import { PrimaryButton } from "../../components/button";

interface FormProps {
  user_name: string;
  password: string;
}

const { RESET_PASSWORD } = ApplicationRoutes;

export const Login = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const handleLogin = handleSubmit((data) => {
    setLoadingButton(true);
    console.log("data: ", data);
    setLoadingButton(false);
  });

  const handleResetPassword = () => {
    navigate(RESET_PASSWORD);
  }

  return (
    <Container>
      <Content>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

        <WellcomeMessageText>
          {t("pages.login.welcome_message")}
        </WellcomeMessageText>

        <FormContainer onSubmit={handleLogin}>
          <InputContainer>
            <TextField
              id="user_name"
              label={t("pages.login.input_user_email")}
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

          <InputContainer>
            <TextField
              id="password"
              label={t("pages.login.input_password")}
              variant="outlined"
              size="small"
              fullWidth
              type="password"
              {...register("password", {
                required: t("generic.required_input_value"),
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </InputContainer>

          <ForgotPasswordText onClick={handleResetPassword}>
            {t("pages.login.forgot_password_text")}
          </ForgotPasswordText>

          <WrongUserPassword>
            {t("pages.login.wrong_user_password_text")}
          </WrongUserPassword>

          <ActionContainer>
            <PrimaryButton
              type="submit"
              loading={loadingButton}
            >
              {t("pages.login.button_login")}
            </PrimaryButton>
          </ActionContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};
