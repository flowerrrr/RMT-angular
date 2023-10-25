import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invitation} from "../model/invitation.model";
import {ApiService} from "../services/api.service";
import {UtilService} from "../services/util.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RSVPStatus} from "../model/rsvpstatus.model";

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./status-editor.component.css']
})
export class StatusEditorComponent {
  @Input() invitation!: Invitation;

  @Output() statusUpdated: EventEmitter<any> = new EventEmitter();
  @Output() statusEditing: EventEmitter<boolean> = new EventEmitter();

  editing: boolean = false;
  originalStatus: RSVPStatus | null = null;
  statuses = this.utilService.statuses;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private snackbar: MatSnackBar
  ) {

  }

  editStatus() {
    console.log("Editing item", this.invitation);

    const invitationDate = new Date(this.invitation.event.dateTime);
    const now = new Date();
    if (invitationDate < now) {
      // If the invitation date is in the past, we alert the user and don't proceed with editing.
      this.snackbar.open('Keine Online-Rückmeldung mehr möglich.', 'OK', {duration: 3000});
      return;
    }
    this.editing = true;
    this.originalStatus = this.invitation.status;
    this.statusEditing.emit(true);
  }

  finishEdit() {
    this.editing = false;
    // finishEdit() is called before onRowClick() in the invitations component.
    // In order to avoid navigating to the event detail view we need to delay clearing the statusEditing flag.
    setTimeout(() => {
      this.statusEditing.emit(false);
    }, 100);
  }

  onStatusChange(invitation: Invitation) {
    this.apiService.updateInvitation(invitation.id, invitation.status).subscribe(
      response => {
        console.log('Update successful', response);
        this.statusUpdated.emit(invitation.id);
      },
      error => {
        console.error('Error updating status', error);
        // this.errorMessage = 'There was a problem updating the status. Please try again later.';
        // Or if you want to display the actual error message from the server:
        this.snackbar.open("Fehler beim Aktualisieren der Rückmeldung: " + error.error, 'OK');
        invitation.status = this.originalStatus!;
      }
    );
    this.editing = false;
  }

  getStatusLabel(status: RSVPStatus): string {
    return this.utilService.getStatusLabel(status);
  }

  getStatusIcon(status: RSVPStatus): string {
    return this.utilService.getStatusIcon(status);
  }

}
