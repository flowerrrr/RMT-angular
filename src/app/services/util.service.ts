import {Injectable} from '@angular/core';
import {RSVPStatus, RSVPStatusIcons, RSVPStatusLabels} from "../model/rsvpstatus.model";

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

}
