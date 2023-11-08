import {Event} from './event.model';
import {RSVPStatus} from "./rsvpstatus.model";
import {User} from "./user.model";
import {Comment} from "./comment.model";

export interface Invitation {
  id: number;
  status: RSVPStatus;
  event: Event;
  user: User;
  comments: Comment[];
}
