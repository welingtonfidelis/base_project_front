import { useMemo, useRef } from "react";
import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTimes, FaAngleDown } from "react-icons/fa";

import {
  AvatarContent,
  CloseMenuCotent,
  Container,
  DrawerMenuItem,
  MenuContent,
  UserName,
} from "./styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Props } from "./types";
import { userStore } from "../../store/user";
import { AlertConfirm } from "../alertConfirm";
import { storage } from "../../services/storage";
import { ApplicationStorage } from "../../shared/enum/applicationStorage";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { Profile } from "../profile";
import { ProfileChangePassword } from "../profileChangePassword";

const { USER } = ApplicationStorage;
const { ROOT } = ApplicationRoutes;

export const DrawerMenu = (props: Props) => {
  const {
    menuOptions,
    selectedMenuOption,
    handleSelectMenuOption,
    isMenuOpen,
    handleChangeIsMenuOpen,
  } = props;
  const { t } = useTranslation();
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenProfileChangePassword,
    onOpen: onOpenProfileChangePassword,
    onClose: onCloseProfileChangePassword,
  } = useDisclosure();
  const { user: userOnStore, clearUser } = userStore();
  const { remove } = storage();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    console.log("sair");

    clearUser();
    remove(USER);
    navigate(ROOT);
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
          name={userOnStore.name}
          src="" //https://bit.ly/dan-abramov
          size={"lg"}
        />
        <Menu>
          <MenuButton>
            <UserName>
              <span>{userOnStore.name}</span>
              <FaAngleDown size={10} />
            </UserName>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenProfile}>
              {t("components.drawer_menu.profile")}
            </MenuItem>
            <MenuItem onClick={onOpenProfileChangePassword}>
              {t("components.drawer_menu.change_password")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={onOpenLogout} color="red">
              {t("components.drawer_menu.logout")}
            </MenuItem>
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

      <AlertConfirm
        title="Sair do sistema"
        description="Deseja realmente sair do sistema?"
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
        onConfirm={handleLogout}
      />

      <Profile isOpen={isOpenProfile} onClose={onCloseProfile} />
      <ProfileChangePassword
        isOpen={isOpenProfileChangePassword}
        onClose={onCloseProfileChangePassword}
      />
    </Container>
  );
};
