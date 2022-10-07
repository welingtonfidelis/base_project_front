import { Spinner } from "@chakra-ui/react";
import { Content, SpinnecerContainer } from "./styles";
import { Props } from "./types";

export const Preloader = (props: React.PropsWithChildren<Props>) => {
  const { isLoading, children } = props;

  return (
    <Content>
      {isLoading ? (
        <SpinnecerContainer>
          <Spinner
            size={"xl"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </SpinnecerContainer>
      ) : (
        <>{children}</>
      )}
    </Content>
  );
};
