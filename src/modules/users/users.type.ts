import { USER_ROLES } from "./user.constant";

export type IUserRole = typeof USER_ROLES[number]

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  role: IUserRole
  id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

