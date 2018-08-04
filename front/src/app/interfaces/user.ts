
export interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  boards: Array<object>;
}
