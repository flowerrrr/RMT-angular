import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  // Method to handle the logout action
  onLogout(): void {
    // Implement your logout logic here, such as clearing authentication tokens and redirecting to the login screen
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

}
