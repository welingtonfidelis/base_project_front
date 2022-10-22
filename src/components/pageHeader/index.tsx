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
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../services/requests/user";

import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { userStore } from "../../store/user";
import { AlertConfirm } from "../alertConfirm";
import { Profile } from "../profile";
import { ProfileChangePassword } from "../profileChangePassword";

import { Container, IconBackContainer, TitleContainer } from "./styles";
import { Props } from "./types";

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
    isOpen: isOpenProfileChangePassword,
    onOpen: onOpenProfileChangePassword,
    onClose: onCloseProfileChangePassword,
  } = useDisclosure();
  const { user: userOnStore, clearUser } = userStore();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    logout();
    navigate(ROOT);
  };

  return (
    <Container>
      <IconBackContainer>{leftIcon}</IconBackContainer>

      <TitleContainer>{title}</TitleContainer>

      {!hiddenUserMenu && (
        <Menu>
          <MenuButton>
            <Avatar
              name={userOnStore.name}
              src="" //https://bit.ly/dan-abramov
              size={"sm"}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpenProfile}>
              {t("components.page_header.menu_item_profile")}
            </MenuItem>
            <MenuItem onClick={onOpenProfileChangePassword}>
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

      <ProfileChangePassword
        isOpen={isOpenProfileChangePassword}
        onClose={onCloseProfileChangePassword}
      />
    </Container>
  );
};
