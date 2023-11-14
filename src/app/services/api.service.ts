import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {Invitation} from "../model/invitation.model";
import {RSVPStatus} from "../model/rsvpstatus.model";
import {Event} from "../model/event.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  event(eventId: number) {
    return this.http.get<Event>(environment.apiUrl + `/events/${eventId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  invitation(eventId: number): Observable<Invitation> {
    return this.http.get<Invitation>(environment.apiUrl + `/events/${eventId}/invitation`)
      .pipe(
        catchError(this.handleError)
      );
  }

  invitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(environment.apiUrl + '/invitations')
      .pipe(
        catchError(this.handleError)
      );
  }

  eventInvitations(eventId: number): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(environment.apiUrl + `/events/${eventId}/invitations`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateInvitation(id: number, status: RSVPStatus, comment?: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/invitations', {id: id, status: status,   comment: comment !== undefined ? comment : null})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
