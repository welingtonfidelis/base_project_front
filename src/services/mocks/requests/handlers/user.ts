import { omit } from "lodash";
import { rest } from "msw";
import { config } from "../../../../config";
import { EndPoints } from "../../../../shared/enum/endPoints";
import { delay } from "../../../util/delayFunction";
import { userDB } from "../../repositories/user";

export const userHandler = [
  rest.post(config.REST_API_URL + EndPoints.LOGIN, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { user_name, password } = await req.json();
      const [user] = await userDB.findByUserNameOrEmail(user_name);

      if (!user) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Invalid user_name or email" })
        );
      }

      if (user.password !== password) {
        return res(ctx.status(401), ctx.json({ message: "Invalid password" }));
      }

      if (user.is_blocked) {
        return res(ctx.status(401), ctx.json({ message: "Blocked user" }));
      }

      return res(ctx.json(omit(user, ['id', 'password', 'user_name', 'is_bloqued'])));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),
];
