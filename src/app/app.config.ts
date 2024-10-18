import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true
    },
    provideAnimations (),
    provideRouter(routes)]
};
