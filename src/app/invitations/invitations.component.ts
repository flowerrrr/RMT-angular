import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Invitation} from "../model/invitation.model";
import {RSVPStatus, RSVPStatusLabels} from "../model/rsvpstatus.model";
import {UtilService} from "../services/util.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StatusEditorComponent} from "../status-editor/status-editor.component";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  invitations: Invitation[] = [];
  statuses = this.utilService.statuses; // to use in *ngFor

  errorMessage: string | null = null;
  statusEditing: boolean = false;

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

  onRowClicked(invitation: Invitation) {
    if (this.statusEditing) {
      // just hide select box and display icon again
      return;
    }
    // Navigate to the detail view for the clicked item.
    this.router.navigate(['/event', invitation.event.id, invitation.id]);
  }

  onStatusEditing($event: boolean) {
    this.statusEditing = $event;
  }
}
