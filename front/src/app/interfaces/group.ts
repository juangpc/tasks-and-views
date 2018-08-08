import { Task } from '../interfaces/task';
import { View } from '../interfaces/view';

export interface Group {
  _id: string;
  name: string;
  view: View;
  color: string;
  tasks: Array<Task>;
}
