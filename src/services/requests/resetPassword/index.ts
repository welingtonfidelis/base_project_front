import { toast } from "react-toastify";
import i18n from "i18next";

import { delay } from "../../util/delayFunction";
import { ResponseInterface } from "../types";

export const resetPasswordRequests = () => {
  const resetPassword = async (
    email: string
  ): Promise<ResponseInterface<{}>> => {
    try {
      // temporaly
      await delay(1000);
      
      toast.success(i18n.t('pages.reset_password.success_request_message') as string);

      return Promise.resolve({
        ok: true
      });

    } catch (error) {
      toast.error(i18n.t("pages.reset_password.error_request_message") as string);

      return Promise.resolve({
        ok: false,
      });
    }
  };

  return { resetPassword };
};
