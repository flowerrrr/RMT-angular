import {Component, OnInit} from '@angular/core';
import {ErrorService} from "./services/error.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit() {
    this.errorService.error$.subscribe(msg => {
      // Assign the error message, which will make your error-display element visible
      this.errorMessage = msg;

      // Optionally, clear the message after a certain time
      // setTimeout(() => this.errorMessage = null, 3000); // 3 seconds display
    });
  }

  // Method to clear the error message, called by the dismiss button
  dismissError() {
    this.errorMessage = null;
  }


}
