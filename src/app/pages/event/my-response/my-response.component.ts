import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invitation} from "../../../model/invitation.model";
import {RSVPStatus} from "../../../model/rsvpstatus.model";
import {ApiService} from "../../../services/api.service";
import {UtilService} from "../../../services/util.service";
import {debounceTime, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-response',
  templateUrl: './my-response.component.html',
  styleUrls: ['./my-response.component.css']
})
export class MyResponseComponent {
  @Input() invitation!: Invitation;

  @Output() statusUpdated: EventEmitter<any> = new EventEmitter();

  protected readonly RSVPStatus = RSVPStatus;
  comment: string = '';
  private commentChange = new Subject<string>();
  private originalStatus: RSVPStatus | null = null;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private snackbar: MatSnackBar
  ) {
    // Auto-save logic
    this.commentChange.pipe(
      debounceTime(1000)  // Adjust debounce time as needed
    ).subscribe(newValue => {
      this.saveComment(newValue);
    });
  }

  ngOnInit(): void {
    this.comment = this.invitation.comments[0]?.text;
    this.originalStatus = this.invitation.status;
  }


  getStatusLabel(status: RSVPStatus): string {
    return this.utilService.getStatusLabel(status);
  }


  onCommentChange(newValue: string) {
    this.commentChange.next(newValue);
  }

  saveComment(comment: string) {
    this.comment = comment;
    this.updateInvitation();
  }

  onStatusChange() {
    this.updateInvitation();
  }

  private updateInvitation() {
    console.log('Saving comment:', this.comment);
    console.log('Saving status:', this.invitation.status);
    this.apiService.updateInvitation(this.invitation.id, this.invitation.status, this.comment).subscribe(
      response => {
        console.log('Update successful', response);
        this.statusUpdated.emit(this.invitation.id);
      },
      error => {
        console.error('Error updating status', error);
        // this.errorMessage = 'There was a problem updating the status. Please try again later.';
        // Or if you want to display the actual error message from the server:
        this.snackbar.open("Fehler beim Aktualisieren der Rückmeldung: " + error.error, 'OK');
        this.invitation.status = this.originalStatus!;
      }
    );
  }
}
