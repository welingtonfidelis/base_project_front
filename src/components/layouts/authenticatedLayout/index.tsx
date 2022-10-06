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

  const isMobileScreen = useMemo(() => {
    const mobileWitdth = window.innerWidth <= 600;

    return mobileWitdth;
  }, [window.innerWidth]);

  const pageTitle = useMemo(() => {
    return (
      menuOptions.find((item) => item.value === selectedMenuOption)?.label || ""
    );
  }, [selectedMenuOption]);

  useEffect(() => {
    const initialPage = menuOptions?.[0].value;
    setSelectedMenuOption(initialPage);
    navigate(initialPage);
  }, []);

  const PageHeaderLeftIcon = () => {
    if (isMobileScreen) {
      return <FaBars color="#fff" onClick={() => setIsMenuOpen(true)} />;
    }

    return <></>;
  };

  const handleSelectMenuOption = (value: string) => {
    setSelectedMenuOption(value);
    navigate(value);
  };

  return (
    <Container>
      <DrawerMenu
        menuOptions={menuOptions}
        selectedMenuOption={selectedMenuOption}
        handleSelectMenuOption={handleSelectMenuOption}
        isMenuOpen={isMenuOpen}
        handleChangeIsMenuOpen={setIsMenuOpen}
      />
      <MainContent>
        <PageHeader title={pageTitle} leftIcon={<PageHeaderLeftIcon />} />
        <Main>{children}</Main>
      </MainContent>
    </Container>
  );
};
