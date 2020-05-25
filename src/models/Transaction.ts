import { IUser } from './User';

export interface ITransaction {
  _id?: string;
  value: number;
  issuer: IUser;
  target: IUser;
  cycle?: string;
}
