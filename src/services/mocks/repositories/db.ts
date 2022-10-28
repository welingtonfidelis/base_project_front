
import Dexie, { Table } from 'dexie';
import { PermissionFullDB } from './permission/types';
import { UserFullDB } from './user/types';

export class DB extends Dexie {
  users!: Table<UserFullDB>; 
  permissions!: Table<PermissionFullDB>;

  constructor() {
    super('base_project_front_db');
    this.version(1).stores({
      users: '++id, user_name, email',
      permissions: '++id, value',
    });
  }
}

export const mockDB = new DB();