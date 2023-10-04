import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + '/login',
      {
        username: username,
        password: password,
      }
    ).pipe(
      tap(response => { // side effect: does not affect the flow of data
        localStorage.setItem('accessToken', response['accessToken']);
      })
    );

  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

}
