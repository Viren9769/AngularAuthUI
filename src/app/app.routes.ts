import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { EmailComponent } from './Components/email/email.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'

    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
       // canActivate: [authGuard]
    },
    {
        path: 'signup',
        title: 'signup',
        component: SignupComponent,
       // canActivate: [authGuard]
    },
    {
        path:'email',
        title: 'Email Verification',
        component: EmailComponent,
      //  canActivate: [authGuard]
    },
    {
        path:'dashboard',
        title: 'Dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    }

];
