import { IUser } from './User';

export interface ITransaction {
  _id?: string;
  value?: number;
  issuer?: string;
  target?: IUser;
  cycle?: string;
}
