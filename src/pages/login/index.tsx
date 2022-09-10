import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import {
  ActionContainer,
  Container,
  Content,
  ForgotPasswordText,
  FormContainer,
  InputContainer,
  LogoContainer,
  WellcomeMessageContainer,
} from "./styles";

import logoImage from "../../assets/logo.png";

interface FormProps {
  user_name: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const handleLogin = handleSubmit((data) => {
    console.log("data: ", data.user_name);
  });

  return (
    <Container>
      <Content>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

        <WellcomeMessageContainer>
          <span>Por favor, insira seus dados abaixo.</span>
        </WellcomeMessageContainer>

        <FormContainer onSubmit={handleLogin}>
          <InputContainer>
            <TextField
              id="user_name"
              label="Usuário"
              variant="outlined"
              size="small"
              {...register("user_name", {
                required: "Insere ai brother",
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
                required: "Insere ai brother",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </InputContainer>

          <ForgotPasswordText>
            Esqueceu sua senha? Clique aqui.
          </ForgotPasswordText>
         
          <ActionContainer>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
            >
              Entrar
            </Button>
          </ActionContainer>
        </FormContainer>
      </Content>
    </Container>
  );
};
