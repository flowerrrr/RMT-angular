import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Invitation} from "../model/invitation.model";
import {RSVPStatus, RSVPStatusLabels} from "../model/rsvpstatus.model";
import {UtilService} from "../services/util.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  invitations: Invitation[] = [];
  statuses = this.utilService.statuses; // to use in *ngFor

  // store the reference to the item being edited
  editingItem: any = null;
  editingItemOriginalStatus: RSVPStatus | null = null;
  // to prevent the row from being clicked when the user is editing the status.
  // in some cases the row click event is triggered after the combo box is closed.
  private justFinishedEditing: boolean = false;

  errorMessage: string | null = null;

  // Columns displayed in the table. Columns IDs can be added, removed, or reordered.
  displayedColumns = ['date', 'summary', 'status'];



  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.apiService.invitations().subscribe(
      invitations => this.invitations = invitations
    );
  }

  getStatusLabel(status: RSVPStatus): string {
    return this.utilService.getStatusLabel(status);
  }

  getStatusIcon(status: RSVPStatus): string {
    return this.utilService.getStatusIcon(status);
  }

  editStatus(event: MouseEvent, item: Invitation) {
    event.stopPropagation();
    console.log("Editing item", item);

    const invitationDate = new Date(item.event.dateTime);
    const now = new Date();
    if (invitationDate < now) {
      // If the invitation date is in the past, we alert the user and don't proceed with editing.
      this.snackbar.open('Keine Online-Rückmeldung mehr möglich.', 'OK', {duration: 1000});
      return;
    }
    this.editingItem = item;
    this.editingItemOriginalStatus = item.status;
  }

  finishEdit() {
    console.log("Finishing edit", this.editingItem);
    this.editingItem = null;
    // to prevent onRowClicked() from navigating away
    this.justFinishedEditing = true;
  }

  onStatusChange(item: any) {
    this.apiService.updateInvitation(item.id, item.status).subscribe(
      response => {
        console.log('Update successful', response);
        this.errorMessage = null;
      },
      error => {
        console.error('Error updating status', error);
        // this.errorMessage = 'There was a problem updating the status. Please try again later.';
        // Or if you want to display the actual error message from the server:
        this.errorMessage = error.error;
        item.status = this.editingItemOriginalStatus;
      }
    );
    this.editingItem = null; // close the combo box after updating
    this.justFinishedEditing = false;
  }

  onRowClicked(invitation: Invitation) {
    // don't navigate away if user is editing the status
    console.log("Row clicked", this.editingItem);
    if (this.editingItem || this.justFinishedEditing) {
      this.editingItem = null;
      this.justFinishedEditing = false;
    } else {
      // Navigate to the detail view for the clicked item.
      this.router.navigate(['/event', invitation.event.id]);
    }
  }

}
