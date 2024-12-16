// import { HttpInterceptorFn } from '@angular/common/http';
// import { TokenApiModel } from '../../Model/token-api.model';
// import { AuthserviceService } from '../../services/authservice.service';
// import { inject } from '@angular/core';
// import { catchError, switchMap, throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';

// export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
//   const tokenApiModel = inject(TokenApiModel);
//   const auth = inject(AuthserviceService);
//   const toast = inject(ToastrService);
//   const route = inject(Router);
//   tokenApiModel.accessToken = auth.getToken();
//   tokenApiModel.refreshToken = auth.getRefreshToken();
//   return auth.renewToken(tokenApiModel)
//   .pipe(
//     switchMap((data:TokenApiModel) => {
//       auth.storeRefreshToken(data.refreshToken);
//       auth.storeToken(data.accessToken);
//       req = req.clone({
//         setHeaders: {Authorization: `Bearer ${data.accessToken}`}
//       })
//       return next(req);
//     }),
//     catchError((err: any) => {
//       return throwError(()=> {
//         toast.warning('Token is expired, please login again!');
//         route.navigate(['login'])
//       })
//     })
//   );
// }



    