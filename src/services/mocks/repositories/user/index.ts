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
    const pageNumber = page -1;
    const pageSize = 20;

    return this.db.users
      .where("id")
      .notEqual(loggedUserId)
      .offset(pageNumber * pageSize)
      .limit(pageSize)
      .toArray();
  }

  findByUserNameOrEmail(username: string) {
    return this.db.users
      .where("username")
      .equals(username)
      .or("email")
      .equals(username)
      .toArray();
  }

  findById(id: number) {
    return this.db.users.where("id").equals(id).toArray();
  }

  create(data: Omit<UserFullDB, 'id'>) {
    return this.db.users.add(data);
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
