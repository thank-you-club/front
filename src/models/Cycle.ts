import { ITeam } from './Team';

export interface ICycle {
  _id?: string;
  team?: ITeam;
  startDate?: number;
  endDate?: number;
}
