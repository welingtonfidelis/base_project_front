import { useEffect, useMemo, useState } from "react";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

import {
  AvatarContent,
  CloseMenuCotent,
  Container,
  DrawerMenuItem,
  MenuContent,
  UserName,
} from "./styles";

interface Props {
  menuOptions: {
    label: string;
    value: string;
  }[];
  onClick: (value: string) => void;
}

export const DrawerMenu = (props: Props) => {
  const { menuOptions, onClick } = props;
  const [drawerMobileClass, setDrawerMobileCass] = useState("");
  const [selectedMenuOption, setSelectedMenuOption] = useState("");

  // const [isMobileScreen, setIsMobileScreen] = useState(false);
  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log('isMobileScreen: ',window.innerWidth, isMobileScreen);
  //     if (window.innerWidth <= 600 && !isMobileScreen) {
  //       console.log('bora pro mobile');

  //       setIsDrawerOpen(false);
  //       setIsMobileScreen(true);

  //       return;
  //     } else if (window.innerWidth > 600 && isMobileScreen) {

  //       console.log('bora pro desktop');

  //       setIsDrawerOpen(true);
  //       setIsMobileScreen(false);
  //     }
  //   }

  //   window.addEventListener("resize", handleResize);
  // });

  const isMobileScreen = useMemo(() => {
    const mobileWitdth = window.innerWidth <= 600;

    return mobileWitdth;
  }, [window.innerWidth]);

  useEffect(() => {
    setSelectedMenuOption(menuOptions?.[0].value);
  }, []);

  const handleCloseOpenMenu = (state: boolean) => {
    if (state) {
      setDrawerMobileCass("slide-right");
      return;
    }

    setDrawerMobileCass("slide-left");
  };

  const handleChangeOptionMenu = (value: string) => {
    setSelectedMenuOption(value);
    handleCloseOpenMenu(false);
    onClick(value);
  };

  return (
    <>
      {isMobileScreen && (
        <div>
          <FaBars onClick={() => handleCloseOpenMenu(true)} />
        </div>
      )}
      <Container className={drawerMobileClass}>
        {isMobileScreen && (
          <CloseMenuCotent>
            <FaTimes onClick={() => handleCloseOpenMenu(false)} size={18} />
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
    </>
  );
};
