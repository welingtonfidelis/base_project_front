import { useMemo, useRef } from "react";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaTimes, FaAngleDown } from "react-icons/fa";

import {
  AvatarContent,
  CloseMenuCotent,
  Container,
  DrawerMenuItem,
  MenuContent,
  UserName,
} from "./styles";
import { DrawerMenuprops } from "./types";

export const DrawerMenu = (props: DrawerMenuprops) => {
  const {
    menuOptions,
    selectedMenuOption,
    handleSelectMenuOption,
    isMenuOpen,
    handleChangeIsMenuOpen,
  } = props;


  const firstRender = useRef(true);

  const isMobileScreen = useMemo(() => {
    const mobileWitdth = window.innerWidth <= 600;

    return mobileWitdth;
  }, [window.innerWidth]);

  const menuContainerClassName = useMemo(() => {
    if (!isMobileScreen) return "";

    if (firstRender.current) {
      firstRender.current = false;
      return "";
    }

    if (isMenuOpen) return "slide-right";

    return "slide-left";
  }, [isMenuOpen]);

  const handleChangeOptionMenu = (value: string) => {
    handleSelectMenuOption(value);

    if (isMobileScreen) handleChangeIsMenuOpen(false);
  };

  return (
    <Container className={menuContainerClassName}>
      {isMobileScreen && (
        <CloseMenuCotent>
          <FaTimes onClick={() => handleChangeIsMenuOpen(false)} size={18} />
        </CloseMenuCotent>
      )}

      <AvatarContent>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size={"lg"}
        />
        <Menu>
          <MenuButton>
            <UserName>
              <span>
                Dan Abrahmov bla bla bla bla bla bla bla bla bla bla 2
              </span>{" "}
              <FaAngleDown size={10} />
            </UserName>
          </MenuButton>
          <MenuList>
            <MenuItem>Perfil</MenuItem>
            <MenuItem>Sair</MenuItem>
          </MenuList>
        </Menu>
      </AvatarContent>

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
