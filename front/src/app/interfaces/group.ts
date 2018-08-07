import { Task } from '../interfaces/task';

export interface Group {
  _id: string;
  name: string;
  tasks: Array<Task>;
}
