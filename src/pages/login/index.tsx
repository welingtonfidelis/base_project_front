import TextField from "@mui/material/TextField";
import Button from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";

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
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface FormProps {
  user_name: string;
  password: string;
}

export const Login = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const { t } = useTranslation();
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
              label="Usuário"
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
              label="Senha"
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

          <ForgotPasswordText>
            {t("pages.login.forgot_password_text")}
          </ForgotPasswordText>

          <WrongUserPassword>
            {t("pages.login.wrong_user_password_text")}
          </WrongUserPassword>

          <ActionContainer>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              loading={loadingButton}
            >
              Entrar
            </Button>
          </ActionContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};
