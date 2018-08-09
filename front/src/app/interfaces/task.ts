
import { Board } from '../interfaces/board';

export interface Task {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  color?: string;
  board: Board;
}
