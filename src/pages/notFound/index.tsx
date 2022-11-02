import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import balloonImage from "../../assets/balloon.png";
import { Container, ImageContent, TextContent } from "./styles";

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <ImageContent>
        <img src={balloonImage} alt="Balloon image" />
      </ImageContent>

      <TextContent>
        <span>{t("pages.not_found.title_message")}</span>
        <span>{t("pages.not_found.description_message")}</span>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => navigate(-1)}
        >
          {t("generic.button_back")}
        </Button>
      </TextContent>
    </Container>
  );
};
