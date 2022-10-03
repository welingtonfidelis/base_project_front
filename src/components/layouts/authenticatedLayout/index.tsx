import React from "react";
import { DrawerMenu } from "../../drawerMenu";
import { Container, Main } from "./styles";

export const AuthenticatedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Container>
      <DrawerMenu />
      <Main>{children}</Main>
    </Container>
  );
};
