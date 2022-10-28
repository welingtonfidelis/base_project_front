import { rest } from "msw";

import { config } from "../../../../config";
import { EndPoints } from "../../../../shared/enum/endPoints";
import { delay } from "../../../util/delayFunction";
import { permissionDB } from "../../repositories/permission";
import { ApplicationMockKey } from "./types";

const { REST_API_URL } = config;
const { USER_SESSION } = ApplicationMockKey;
const { LIST } = EndPoints.PERMISSIONS;

export const permissionHandler = [
  rest.get(`${REST_API_URL}${LIST}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const userOnSession = sessionStorage.getItem(USER_SESSION);

      if (!userOnSession) {
        return res(
          ctx.status(403),
          ctx.json({ message: "User not authenticated" })
        );
      }

      const userOnSessionParsed = JSON.parse(userOnSession);
      const permissions = await permissionDB.find();
      const filteredPermissions = permissions.filter((item) => userOnSessionParsed.permissions.includes(item.value));

      return res(ctx.json(filteredPermissions));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),
];
