import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Collapse,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

import {
  AvatarContent,
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
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
    setIsDrawerOpen(!mobileWitdth);

    return mobileWitdth;
  }, [window.innerWidth]);

  useEffect(() => {
    setSelectedMenuOption(menuOptions?.[0].value);
  }, []);

  const handleChangeOptionMenu = (value: string) => {
    setSelectedMenuOption(value);
    onClick(value);
  }

  return (
    <>
      {isMobileScreen && (
        <FaBars onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
      )}
      <Container>
        <Collapse in={isDrawerOpen} animateOpacity>
          {isMobileScreen && (
            <FaTimes onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
          )}

          <AvatarContent>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Menu>
              <MenuButton>
                <UserName>
                  <span>Dan Abrahmov</span> <FaAngleDown size={10} />
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
        </Collapse>
      </Container>
    </>
  );
};
