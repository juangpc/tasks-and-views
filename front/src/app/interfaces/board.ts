import { User } from '../interfaces/user';
import { View } from '../interfaces/view';

export interface Board {
  _id: string;
  name: string;
  owner: User;
  users: Array<User>;
  views: Array<View>;
}
