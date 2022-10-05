import { Container, IconBackContainer, TitleContainer } from "./styles";
import { PageHeaderProps } from "./types";

export const PageHeader = (props: PageHeaderProps) => {
  const { title, leftIcon } = props;

  return (
    <Container>
      <IconBackContainer>
        {leftIcon}
      </IconBackContainer>

      <TitleContainer>{title}</TitleContainer>
    </Container>
  );
};
