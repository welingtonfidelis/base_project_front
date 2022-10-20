import { useMemo, useRef } from "react";
import { Image } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

import {
  LogoImageContent,
  CloseMenuCotent,
  Container,
  DrawerMenuItem,
  MenuContent,
} from "./styles";

import { Props } from "./types";

import logoImage from "../../assets/logo.png";

export const DrawerMenu = (props: Props) => {
  const {
    menuOptions,
    selectedMenuOption,
    handleSelectMenuOption,
    isMenuOpen,
    handleChangeIsMenuOpen,
  } = props;
  
  const firstRender = useRef(true);

  const menuContainerClassName = useMemo(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return "";
    }

    if (isMenuOpen) return "slide-right";

    return "slide-left";
  }, [isMenuOpen]);

  const handleChangeOptionMenu = (value: string) => {
    handleSelectMenuOption(value);
    handleChangeIsMenuOpen(false);
  };

  return (
    <Container className={menuContainerClassName}>
      <CloseMenuCotent className="mobile-icon-close-drawer">
        <FaTimes onClick={() => handleChangeIsMenuOpen(false)} size={18} />
      </CloseMenuCotent>

      <LogoImageContent>
        <Image boxSize="7.5rem" src={logoImage} />
      </LogoImageContent>

      <MenuContent>
        {menuOptions.map((item, index) => (
          <DrawerMenuItem
            key={index}
            selected={item.value === selectedMenuOption}
            onClick={() => handleChangeOptionMenu(item.value)}
          >
            {item.label}
          </DrawerMenuItem>
        ))}
      </MenuContent>
    </Container>
  );
};
