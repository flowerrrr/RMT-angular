import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./pages/login/login.component";
import {EventsComponent} from "./pages/events/events.component";
import {EventComponent} from "./pages/event/event.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventsComponent},
  {path: 'event/:eventId', component: EventComponent},
  {path: '', redirectTo: '/events', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
