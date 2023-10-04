import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Invitation} from "../model/invitation.model";
import {Event} from "../model/event.model";
import {Location} from '@angular/common';
import {UtilService} from "../services/util.service";
import {RSVPStatus} from "../model/rsvpstatus.model";

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent {
  invitations: Invitation[] = [];
  event: Event | null = null;
  protected readonly RSVPStatus = RSVPStatus;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private utilService: UtilService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.eventInvitations(eventId)
      .subscribe(data => this.invitations = data);
    this.apiService.event(eventId)
      .subscribe(data => this.event = data);
  }

  getInvitations(status: RSVPStatus) {
    return this.invitations.filter(i => i.status === status);
  }

  getStatusLabel(status: RSVPStatus): string {
    return this.utilService.getStatusLabel(status);
  }

  goBack(): void {
    this.location.back();
  }

}