import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { Container, TitleContainer } from "./styles";
import { PageHeaderProps } from "./types";
import { useNavigate } from "react-router-dom";

export const PageHeader = (props: PageHeaderProps) => {
  const { title } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <IconButton
        aria-label="upload picture"
        component="label"
        onClick={() => navigate(-1)}
        title={t("generic.button_back")}
      >
        <ArrowBack />
      </IconButton>

      <TitleContainer>{title}</TitleContainer>

      <div></div>
    </Container>
  );
};
