import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { API_CONFIG } from './config/api.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { provideNgxMask } from 'ngx-mask';

const domain = new URL(API_CONFIG.baseUrl).host;

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    AuthInterceptorProvider, provideNgxMask(),

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [domain], 
          disallowedRoutes: []
        }
      })
    )
  ]
};