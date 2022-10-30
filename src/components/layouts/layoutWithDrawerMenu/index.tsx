import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../../routes";
import { checkPermissionsService } from "../../../services/util/checkPermissions";
import { DrawerMenu } from "../../drawerMenu";
import { PageHeader } from "../../pageHeader";
import { Container, Main, MainContent } from "./styles";

export const LayoutWithDrawerMenu = ({ children }: React.PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkPermissions } = checkPermissionsService();

  const menuOptions = routes
    .filter((item) => {
      return checkPermissions(item.permissions) && item.isMenuOption;
    })
    .map((item) => {
      return { label: t(item.label), value: item.path };
    });

  const selectedOption = useMemo(() => {
    return menuOptions.find((item) => item.value === location.pathname);
  }, [location.pathname]);

  const handleSelectMenuOption = (value: string) => {
    navigate(value);
  };

  return (
    <Container>
      {menuOptions.length && (
        <>
          <DrawerMenu
            menuOptions={menuOptions}
            selectedMenuOption={selectedOption?.value || ""}
            handleSelectMenuOption={handleSelectMenuOption}
            isMenuOpen={isMenuOpen}
            handleChangeIsMenuOpen={setIsMenuOpen}
          />
          <MainContent>
            <PageHeader
              title={selectedOption?.label || ""}
              leftIcon={
                <FaBars
                  className="mobile-icon-open-drawer"
                  color="#fff"
                  onClick={() => setIsMenuOpen(true)}
                />
              }
            />
            <Main>{children}</Main>
          </MainContent>
        </>
      )}
    </Container>
  );
};
