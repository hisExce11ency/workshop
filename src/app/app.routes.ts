import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './poage-not-found/poage-not-found.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
//import { AddThemeComponent } from './theme/add-theme/add-theme.component'; not required because of lazy loading
import { MainComponent } from './main/main.component';
import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
import { authGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //Start -User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  //End -User routing

  //Start -Theme routing
  {
    path: 'themes',
    children: [
      { path: '', component: MainComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'add-theme',
    loadComponent: () =>
      import('./theme/add-theme/add-theme.component').then(
        (c) => c.AddThemeComponent
      ),
    canActivate: [authGuard],
  },
  //End -Theme routing
  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];
