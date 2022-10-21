  import { localDB, DB } from "../db";
  
  class UserDB {
    db: DB;
  
    constructor() {
      this.db = localDB;
    }

    findByUserNameOrEmail(user_name: string) {
      return this.db.users.where(["user_name", "email"]).equals(user_name).toArray();
    }
}

export const userDB = new UserDB();