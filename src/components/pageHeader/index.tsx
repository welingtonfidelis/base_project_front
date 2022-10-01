import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

import { Container, IconBackContainer, TitleContainer } from "./styles";
import { PageHeaderProps } from "./types";
import { useNavigate } from "react-router-dom";

export const PageHeader = (props: PageHeaderProps) => {
  const { title } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <IconBackContainer
        onClick={() => navigate(-1)}
        title={t("generic.button_back")}
      >
        <FaArrowLeft />
      </IconBackContainer>

      <TitleContainer>{title}</TitleContainer>

      <div></div>
    </Container>
  );
};
