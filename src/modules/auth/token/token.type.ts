import { USER_ROLES } from 'src/modules/users/user.constant';

export type JWTPayload = {
  userId: string;
  email: string;
  role: USER_ROLES;
};
