import { users } from "../../data/users";
import { DB, mockDB } from "../db";

class UserDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  findByUserNameOrEmail(user_name: string) {
    return this.db.users
      .where("user_name")
      .equals(user_name)
      .or("email")
      .equals(user_name)
      .toArray();
  }
}

export const userDB = new UserDB();

mockDB.on("populate", async () => {
  await mockDB.users.bulkAdd(users);
});
