import { permissions } from "../../data/permissions";
import { DB, mockDB } from "../db";

class PermissionDB {
  db: DB;

  constructor() {
    this.db = mockDB;
  }

  find() {
    return this.db.permissions.toArray();
  }
}

export const permissionDB = new PermissionDB();

mockDB.on("populate", async () => {
  await mockDB.permissions.bulkAdd(permissions);
});
