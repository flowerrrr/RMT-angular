import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {EventsComponent} from './pages/events/events.component';
import {AuthInterceptorService} from './helpers/auth.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from "./helpers/jwt.interceptor";
import {DatePipe, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {EventComponent} from './pages/event/event.component';
import {HttpErrorInterceptor} from "./helpers/http-error.interceptor";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {FooterComponent} from './components/footer/footer.component';
import {StatusEditorComponent} from './components/status-editor/status-editor.component';
import {MatRadioModule} from "@angular/material/radio";
import { MyResponseComponent } from './pages/event/my-response/my-response.component';

registerLocaleData(localeDe, 'de');


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent,
    LoginComponent,
    ToolbarComponent,
    FooterComponent,
    StatusEditorComponent,
    MyResponseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
