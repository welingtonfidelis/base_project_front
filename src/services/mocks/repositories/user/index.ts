import { users } from "../../data/users";
import { DB, mockDB } from "../db";
import { UserFullDB } from "./types";

class UserDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  count() {
    return this.db.users.count();
  }

  find(page: number, loggedUserId: number) {
    const pageSize = 20;

    return this.db.users
      .where("id")
      .notEqual(loggedUserId)
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray();
  }

  findByUserNameOrEmail(user_name: string) {
    return this.db.users
      .where("user_name")
      .equals(user_name)
      .or("email")
      .equals(user_name)
      .toArray();
  }

  findById(id: number) {
    return this.db.users.where("id").equals(id).toArray();
  }

  update(id: number, data: Partial<UserFullDB>) {
    return this.db.users.update(id, data);
  }

  delete(id: number) {
    return this.db.users.delete(id);
  }
}

export const userDB = new UserDB();

mockDB.on("populate", async () => {
  await mockDB.users.bulkAdd(users);
});
