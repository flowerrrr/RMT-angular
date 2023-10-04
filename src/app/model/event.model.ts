import { Team } from './team.model';

export interface Event {
  id: number;
  eventType: string;
  dateTime: Date;
  dateTimeEnd: Date;
  summary: string;
  canceled: boolean;
  team: Team;
}
