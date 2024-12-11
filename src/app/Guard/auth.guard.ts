import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { ToastrService } from 'ngx-toastr';


// a guard is a method that gives you true or false value given on a condition.
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthserviceService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  if(auth.isLoggedIn()){
    return true;
  }
  else{
    toast.error('You must be logged in to access this page!');
    router.navigate(['/login']);
    return false;

  }

  
};
