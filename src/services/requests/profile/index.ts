import { toast } from "react-toastify";
import i18n from "i18next";

import { delay } from "../../util/delayFunction";
import { ResponseInterface } from "../types";
import { User } from "../../../domains/user";
import { OmitCommonProps } from "@chakra-ui/react";

export const ProfileRequests = () => {
  const updateProfile = async (
    user: OmitCommonProps<User, 'permissions'>
  ): Promise<ResponseInterface<{}>> => {
    try {
      // temporaly
      await delay(1000);
      
      toast.success(i18n.t('components.profile.success_request_message') as string);

      return Promise.resolve({
        ok: true
      });

    } catch (error) {
      toast.error(i18n.t("components.profile.error_request_message") as string);

      return Promise.resolve({
        ok: false,
      });
    }
  };

  return { updateProfile };
};
