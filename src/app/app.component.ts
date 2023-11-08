import {Component, OnInit} from '@angular/core';
import {ErrorService} from "./services/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(
    private errorService: ErrorService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.errorService.error$.subscribe(msg => {
      // Assign the error message, which will make your error-display element visible
      this.snackbar.open(msg, 'OK');
    });
  }

}
