
import Dexie, { Table } from 'dexie';
import { UserDB } from './user/types';

export class DB extends Dexie {
  users!: Table<UserDB>; 

  constructor() {
    super('base_project_front_db');
    this.version(1).stores({
      users: '++id, user_name, email',
    });
  }
}

export const localDB = new DB();