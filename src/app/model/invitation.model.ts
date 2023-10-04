import {Event} from './event.model';
import {RSVPStatus} from "./rsvpstatus.model";
import {User} from "./user.model";

export interface Invitation {
  id: number;
  status: RSVPStatus;
  event: Event;
  user: User;
}
