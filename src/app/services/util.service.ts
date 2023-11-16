import {Injectable} from '@angular/core';
import {RSVPStatus, RSVPStatusIcons, RSVPStatusLabels} from "../model/rsvpstatus.model";
import {Event} from "../model/event.model";
import {EventType, EventTypeLabels} from "../model/eventtype.model";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  statuses = [RSVPStatus.ACCEPTED, RSVPStatus.UNSURE, RSVPStatus.DECLINED]; // to use in *ngFor

  getStatusLabel(status: RSVPStatus): string {
    return RSVPStatusLabels[status];
  }

  getStatusIcon(status: RSVPStatus): string {
    return RSVPStatusIcons[status];
  }

  isEventClosed(event: Event) {
    const eventDate = new Date(event.dateTime);
    const now = new Date();
    return eventDate < now;
  }

  getEventTypeLabel(eventType: EventType): string {
    return EventTypeLabels[eventType];
  }


}
