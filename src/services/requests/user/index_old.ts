import { toast } from "react-toastify";
import i18n from "i18next";

import { delay } from "../../util/delayFunction";
import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";
import { LoggedUser } from "../../../domains/user";
import {
  ListUsersPayload,
  ListUsersResponse,
  LoginPayload,
  LoginResponse,
  ResetPasswordResponse,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "./types";

const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const userRequests = () => {
  const login = async (data: LoginPayload): Promise<LoginResponse> => {
    try {
      // temporaly
      await delay(1000);
      const { email, password } = data;
      let permissions = [];
      let name = "";

      if (email === "admin") {
        permissions = [ADMIN, MANAGER, USER];
        name = "Admin User 1";
      } else if (email === "manager") {
        name = "Manager User 1";
        permissions = [MANAGER, USER];
      } else if (email === "user") {
        name = "User 1";
        permissions = [USER];
      } else throw new Error("invalid user");

      const user: LoggedUser = {
        name,
        email: "test@email.com",
        permissions,
      };

      return Promise.resolve({
        ok: true,
        data: user,
      });
    } catch (error) {
      toast.error(i18n.t("pages.login.error_request_message") as string);

      return Promise.resolve({
        ok: false,
      });
    }
  };

  const updateProfile = async (
    data: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    try {
      // temporaly
      await delay(1000);

      toast.success(
        i18n.t("components.profile.success_request_message") as string
      );

      return Promise.resolve({
        ok: true,
      });
    } catch (error) {
      toast.error(i18n.t("components.profile.error_request_message") as string);

      return Promise.resolve({
        ok: false,
      });
    }
  };

  const updatePassword = async (
    data: UpdatePasswordPayload
  ): Promise<UpdatePasswordResponse> => {
    try {
      // temporaly
      await delay(1000);

      toast.success(
        i18n.t(
          "components.profile_change_password.success_request_message"
        ) as string
      );

      return Promise.resolve({
        ok: true,
      });
    } catch (error) {
      toast.error(
        i18n.t(
          "components.profile_change_password.error_request_message"
        ) as string
      );

      return Promise.resolve({
        ok: false,
      });
    }
  };

  const resetPassword = async (
    email: string
  ): Promise<ResetPasswordResponse> => {
    try {
      // temporaly
      await delay(1000);

      toast.success(
        i18n.t("pages.reset_password.success_request_message") as string
      );

      return Promise.resolve({
        ok: true,
      });
    } catch (error) {
      toast.error(
        i18n.t("pages.reset_password.error_request_message") as string
      );

      return Promise.resolve({
        ok: false,
      });
    }
  };

  const listUsers = async (
    data: ListUsersPayload
  ): Promise<ListUsersResponse> => {
    try {
      // temporaly
      await delay(1000);

      const { page } = data;

      const users = Array(50)
        .fill({})
        .map((item, index) => ({
          id: index + page,
          name: `Usuario Teste ${index * page}`,
          user_name: `usuario_teste_${index * page}`,
          email: `usuario_teste_${index * page}@email.com`,
          is_blocked: index % 2 === 0,
          permissions: [MANAGER, USER],
        }));

      return Promise.resolve({
        ok: true,
        data: {
          total: 100,
          users,
        },
      });
    } catch (error) {
      toast.error(i18n.t("pages.user_list.error_request_message") as string);

      return Promise.resolve({
        ok: false,
      });
    }
  };

  return { resetPassword, login, updateProfile, updatePassword, listUsers };
};
