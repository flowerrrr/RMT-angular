import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new Subject<string>();

  // Stream for components to subscribe
  public error$ = this.errorSubject.asObservable();

  handleError(errorMessage: string) {
    // Any global error handling logic can go here
    this.errorSubject.next(errorMessage);
  }

  // Other global error handling methods can go here
}
