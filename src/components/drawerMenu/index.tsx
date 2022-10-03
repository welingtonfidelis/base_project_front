import { useEffect, useMemo, useState } from "react";
import { Collapse, IconButton, List } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";

import { MenuContainer } from "./styles";

export const DrawerMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
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

  return (
    <>
      {isMobileScreen && (
        <FaBars onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
      )}
      <MenuContainer>
        <Collapse in={isDrawerOpen} animateOpacity>
          {isMobileScreen && (
            <FaTimes onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
          )}

          <span>test 1</span>
          <span>test 2</span>
          <span>test 3</span>
          <span>test 4</span>
        </Collapse>
      </MenuContainer>
    </>
  );
};
