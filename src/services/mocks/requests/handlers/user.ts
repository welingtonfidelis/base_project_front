import Omit from "lodash/omit";
import { rest } from "msw";

import { config } from "../../../../config";
import { User } from "../../../../domains/user";
import { EndPoints } from "../../../../shared/enum/endPoints";
import {
  LoginPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
} from "../../../requests/user/types";
import { delay } from "../../../util/delayFunction";
import { userDB } from "../../repositories/user";
import { ApplicationMockKey } from "./types";

const { REST_API_URL } = config;
const { USER_SESSION } = ApplicationMockKey;
const {
  LOGIN,
  LOGOUT,
  PROFILE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  LIST,
  GET,
  UPDATE,
  DELETE,
} = EndPoints.USERS;

export const userHandler = [
  rest.post(`${REST_API_URL}${LOGIN}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { user_name, password } = (await req.json()) as LoginPayload;
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

      const { id, name, permissions } = user;
      sessionStorage.setItem(USER_SESSION, JSON.stringify(user));

      return res(ctx.json({ name, permissions }));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.post(`${REST_API_URL}${LOGOUT}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      sessionStorage.clear();

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.post(`${REST_API_URL}${RESET_PASSWORD}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { user_name } = (await req.json()) as ResetPasswordPayload;
      const [user] = await userDB.findByUserNameOrEmail(user_name);

      if (!user || user.is_blocked) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Invalid user_name or email" })
        );
      }

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.post(`${REST_API_URL}${UPDATE_PASSWORD}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { old_password, new_password } =
        (await req.json()) as UpdatePasswordPayload;

      const userOnSession = sessionStorage.getItem(USER_SESSION);

      if (!userOnSession) {
        return res(
          ctx.status(403),
          ctx.json({ message: "User not authenticated" })
        );
      }

      const userOnSessionParsed = JSON.parse(userOnSession);
      const [user] = await userDB.findById(userOnSessionParsed.id);

      if (!user || user.is_blocked) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Invalid user session" })
        );
      }

      if (user.password !== old_password) {
        return res(
          ctx.status(401),
          ctx.json({ message: "Invalid old password" })
        );
      }

      const wasUpdated = await userDB.update(userOnSessionParsed.id, {
        password: new_password,
      });

      if (!wasUpdated) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Error during update" })
        );
      }

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.get(`${REST_API_URL}${PROFILE}`, async (req, res, ctx) => {
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
      const [user] = await userDB.findById(userOnSessionParsed.id);

      if (!user || user.is_blocked) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Invalid user session" })
        );
      }

      return res(ctx.json(Omit(user, ["password", "is_blocked"])));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.patch(`${REST_API_URL}${PROFILE}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const payload = (await req.json()) as Partial<User>;
      const userOnSession = sessionStorage.getItem(USER_SESSION);

      if (!userOnSession) {
        return res(
          ctx.status(403),
          ctx.json({ message: "User not authenticated" })
        );
      }

      const userOnSessionParsed = JSON.parse(userOnSession);
      const wasUpdated = await userDB.update(userOnSessionParsed.id, payload);
      console.log("wasUpdated: ", wasUpdated);

      if (!wasUpdated) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Error during update" })
        );
      }

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.patch(`${REST_API_URL}${UPDATE}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { id } = req.params;
      const payload = (await req.json()) as Partial<User>;

      const wasUpdated = await userDB.update(Number(id), payload);

      if (!wasUpdated) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Error during update" })
        );
      }

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.delete(`${REST_API_URL}${DELETE}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { id } = req.params;

      await userDB.delete(Number(id));

      return res(ctx.json({}));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.get(`${REST_API_URL}${LIST}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const page = Number(req.url.searchParams.get("page"));
      const userOnSession = sessionStorage.getItem(USER_SESSION);

      if (!userOnSession) {
        return res(
          ctx.status(403),
          ctx.json({ message: "User not authenticated" })
        );
      }

      const total = await userDB.count();
      const users = await userDB.find(page);

      return res(
        ctx.json({
          total,
          users,
        })
      );
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),

  rest.get(`${REST_API_URL}${GET}`, async (req, res, ctx) => {
    try {
      await delay(1000);

      const { id } = req.params;
      const [user] = await userDB.findById(Number(id));

      return res(ctx.json(user));
    } catch (error) {
      console.log("error: ", error);
      return res(ctx.status(500));
    }
  }),
];
