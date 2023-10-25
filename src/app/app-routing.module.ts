import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {InvitationsComponent} from "./invitations/invitations.component";
import {EventInvitationsComponent} from "./event-invitations/event-invitations.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'invitations', component: InvitationsComponent},
  {path: 'event/:eventId', component: EventInvitationsComponent},
  {path: '', redirectTo: '/invitations', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
