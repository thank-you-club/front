import { IUser } from './User';

export interface IOrg {
  _id?: string;
  name?: string;
  isActive?: boolean;
  owner?: string;
  members?: IUser[];
}
