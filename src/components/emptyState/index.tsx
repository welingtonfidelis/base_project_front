import { useTranslation } from "react-i18next";
import emptyStateBoxImage from "../../assets/empty-box.png";
import { Container, ImageContent, TextContent } from "./styles";

export const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ImageContent>
        <img src={emptyStateBoxImage} />
      </ImageContent>

      <TextContent>{t("components.empty_state.message")}</TextContent>
    </Container>
  );
};
