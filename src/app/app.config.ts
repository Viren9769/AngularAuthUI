import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './Components/Interceptor/token.interceptor';
//import { refreshInterceptor } from './Components/Interceptor/refresh.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),
     provideClientHydration(),
     provideHttpClient(withInterceptors([tokenInterceptor])),
     provideToastr(),
     provideAnimations()
    ],
};
