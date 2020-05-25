import { ITeam } from './Team';
import { ITransaction } from './Transaction';

export interface ICycle {
  _id?: string;
  team?: ITeam;
  startDate?: number;
  endDate?: number;
  transactions: ITransaction[];
}
