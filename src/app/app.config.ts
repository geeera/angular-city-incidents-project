import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideMapboxGL } from 'ngx-mapbox-gl';
import { environment } from '../environments/environment';
import { provideAuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideMapboxGL({
      accessToken: environment.mapboxGLAccessToken
    }),
    provideHttpClient(),
    provideAuthInterceptor(),
    provideNativeDateAdapter(),
    provideNgxMask()
  ],
};
