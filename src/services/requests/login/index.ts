import { toast } from "react-toastify";
import i18n from "i18next";

import { User } from "../../../domains/user";
import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";
import { delay } from "../../util/delayFunction";
import { ResponseInterface } from "../types";

const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const loginRequests = () => {
  const login = async (
    email: string,
    password: string
  ): Promise<ResponseInterface<User>> => {
    try {
      // temporaly
      await delay(1000);
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

      const user: User = {
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

  return { login };
};
