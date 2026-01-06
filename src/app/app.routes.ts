import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { TicketsComponent } from './pages/tickets/tickets';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  //{ path: 'register', component: RegisterComponent, standalone: true },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'tickets' },
];
