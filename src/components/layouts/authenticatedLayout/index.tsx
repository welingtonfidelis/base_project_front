import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { DrawerMenu } from "../../drawerMenu";
import { Container, Main } from "./styles";

export const AuthenticatedLayout = ({ children }: React.PropsWithChildren) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuOptions = routes.filter((item) => {
    return item.isMenuOption;
  })
  .map((item) => {
    return { label: t(item.label), value: item.path }
  });

  const handleChangeMenuOption = (value: string) => {
    navigate(value);
  }

  return (
    <Container>
      <DrawerMenu menuOptions={menuOptions} onClick={handleChangeMenuOption}/>
      <Main>{children}</Main>
    </Container>
  );
};
