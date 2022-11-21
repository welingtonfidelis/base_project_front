import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { userStore } from "../../store/user";
import { AlertConfirm } from "../alertConfirm";
import { IconButton } from "../iconButton";

import { useLogout } from "../../services/requests/user";
import { ProfileUpdatePassword } from "./components/profileUpdatePassword";

import { Container, IconBackContainer, TitleContainer } from "./styles";
import { Props } from "./types";
import { Profile } from "./components/profile";

const { ROOT } = ApplicationRoutes;

export const PageHeader = (props: Props) => {
  const { title, hiddenUserMenu, leftIcon } = props;
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
    isOpen: isOpenProfileUpdatePassword,
    onOpen: onOpenProfileUpdatePassword,
    onClose: onCloseProfileUpdatePassword,
  } = useDisclosure();
  const { user: userOnStore, clearUser } = userStore();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const LeftIcon = () => {
    return (
      leftIcon || (
        <IconButton
          icon={<FaArrowLeft size={22} color="#fff" />}
          onClick={() => navigate(-1)}
          title={t("generic.button_back_page")}
        />
      )
    );
  };

  const handleLogout = () => {
    clearUser();
    logout();
    navigate(ROOT);
  };

  return (
    <Container>
      <IconBackContainer>
        <LeftIcon />
      </IconBackContainer>

      <TitleContainer>{title}</TitleContainer>

      {!hiddenUserMenu && (
        <Menu>
          <MenuButton>
            <Avatar
              name={userOnStore.name}
              src={userOnStore.image_url}
              size={"sm"}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenProfile}>
              {t("components.page_header.menu_item_profile")}
            </MenuItem>
            <MenuItem onClick={onOpenProfileUpdatePassword}>
              {t("components.page_header.menu_item_change_password")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={onOpenLogout} color="red">
              {t("components.page_header.menu_item_logout")}
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      <AlertConfirm
        title={t("components.page_header.alert_title_logout")}
        description={t("components.page_header.alert_description_logout")}
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
        onConfirm={handleLogout}
      />

      <Profile isOpen={isOpenProfile} onClose={onCloseProfile} />

      <ProfileUpdatePassword
        isOpen={isOpenProfileUpdatePassword}
        onClose={onCloseProfileUpdatePassword}
      />
    </Container>
  );
};
