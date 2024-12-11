import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) =>{
  const auth = inject(AuthserviceService);
  const toastr = inject(ToastrService);
  const route = inject(Router);
  auth.isAuthenticated.subscribe({
    next:(value) => {
      if(value){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${auth.getToken()}`
          },
        });
      }
    },
  });
  return next(req).pipe(
    catchError((err:any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          toastr.warning('Token is expired, please login again!');
          route.navigate(['login']);
      }
}
      return throwError(()=> new Error("Some other error occurred"));
})
  );
}
