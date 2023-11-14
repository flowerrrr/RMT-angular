import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Invitation} from "../../model/invitation.model";
import {Event} from "../../model/event.model";
import {RSVPStatus} from "../../model/rsvpstatus.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  invitations: Invitation[] = [];
  event: Event | null = null;
  invitation: Invitation | null = null;

  protected readonly RSVPStatus = RSVPStatus;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.apiService.eventInvitations(eventId)
      .subscribe(invitations => this.invitations = invitations);
    this.apiService.invitation(eventId)
      .subscribe(invitation => {
        this.event = invitation.event
        this.invitation = invitation
      });
  }

  /**
   * Called when the status of an invitation has been updated and the invitation list needs to be refreshed.
   */
  handleStatusUpdate(event: string) {
    this.ngOnInit();
  }

  getInvitations(status: RSVPStatus) {
    return this.invitations.filter(i => i.status === status);
  }

}
