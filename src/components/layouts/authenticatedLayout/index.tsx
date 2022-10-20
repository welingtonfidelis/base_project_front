import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { routes } from "../../../routes";
import { checkPermissionsService } from "../../../services/checkPermissions";
import { DrawerMenu } from "../../drawerMenu";
import { PageHeader } from "../../pageHeader";
import { Container, Main, MainContent } from "./styles";

export const AuthenticatedLayout = ({ children }: React.PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkPermissions } = checkPermissionsService();

  const menuOptions = routes
    .filter((item) => {
      return checkPermissions(item.permissions) && item.isMenuOption;
    })
    .map((item) => {
      return { label: t(item.label), value: item.path };
    });

  const pageTitle = useMemo(() => {
    return (
      menuOptions.find((item) => item.value === selectedMenuOption)?.label || ""
    );
  }, [selectedMenuOption]);

  useEffect(() => {
    const initialPage = menuOptions?.[0]?.value;
    setSelectedMenuOption(initialPage);
    navigate(initialPage);
  }, []);

  const handleSelectMenuOption = (value: string) => {
    setSelectedMenuOption(value);
    navigate(value);
  };

  return (
    <Container>
      {menuOptions.length && (
        <>
          <DrawerMenu
            menuOptions={menuOptions}
            selectedMenuOption={selectedMenuOption}
            handleSelectMenuOption={handleSelectMenuOption}
            isMenuOpen={isMenuOpen}
            handleChangeIsMenuOpen={setIsMenuOpen}
          />
          <MainContent>
            <PageHeader
              title={pageTitle}
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
