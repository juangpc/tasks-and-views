import { Group } from '../interfaces/group';

export interface View {
  _id?: string;
  name?: string;
  board?: string;
  groups?: Array<Group>;
}
