import {Team} from './team.model';
import {EventType} from "./eventtype.model";

export interface Event {
  id: number;
  eventType: EventType;
  dateTime: Date;
  dateTimeEnd: Date;
  summary: string;
  canceled: boolean;
  team: Team;
}

