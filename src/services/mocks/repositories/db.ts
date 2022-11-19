import Dexie, { Table } from "dexie";
import { UserFullDB } from "./user/types";

export class DB extends Dexie {
  users!: Table<UserFullDB>;

  constructor() {
    super("base_project_front_db");
    this.version(1).stores({
      users: "++id, username, email",
    });
  }
}

export const mockDB = new DB();
