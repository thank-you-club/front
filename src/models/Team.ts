import { IUser } from './User';
import { IOrg } from './Org';

export interface ITeam {
  _id?: string;
  name?: string;
  isActive?: boolean;
  owner?: IUser;
  org?: IOrg;
  members?: IUser[];
}
