import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//import { refreshInterceptor } from './refresh.interceptor';
import { TokenApiModel } from '../../Model/token-api.model';
import { request } from 'http';
//import { TokenApiModel } from '../../Model/token-api.model';

export const tokenInterceptor: HttpInterceptorFn = (req, next) =>{
  const auth = inject(AuthserviceService);
//  const toastr = inject(ToastrService);
//  const route = inject(Router);
 // const handleerror = inject(refreshInterceptor);
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
         // toastr.warning('Token is expired, please login again!');
          //route.navigate(['login']);
          // handle 401
    //     handleerror(req, next); // call refresh interceptor here
          
      return handleUnauthorizedError(req, next); // redirect

      }
}
      return throwError(()=> new Error("Some other error occurred"));
})
  );
}
const handleUnauthorizedError = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const tokenApiModel = inject(TokenApiModel);
  const auth = inject(AuthserviceService);
  const toast = inject(ToastrService);
  const route = inject(Router);

  tokenApiModel.accessToken = auth.getToken() || '';
  tokenApiModel.refreshToken = auth.getRefreshToken() || '';

  return auth.renewToken(tokenApiModel).pipe(
    switchMap((data: TokenApiModel) => {
      auth.storeRefreshToken(data.refreshToken);
      auth.storeToken(data.accessToken);

      // Clone the request with the updated token
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${data.accessToken}` },
      });

      // Retry the request with the new token
      return next(req);
    }),
    catchError((err: any) => {
      toast.warning('Token is expired, please login again!');
      route.navigate(['login']);
      return throwError(() => new Error('Token renewal failed'));
    })
  );
};

  

  




