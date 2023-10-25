import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  showForgotPasswordMessage: boolean = false;
  errorMessage: string | null  = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm.get('password')!.value
    ).subscribe(
      () => {
        // You could navigate away from the login page or do some other action on success
        this.router.navigate(['/']);
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Ungültiger Benutzername oder Passwort.';
        }
      }
    );
  }
}
