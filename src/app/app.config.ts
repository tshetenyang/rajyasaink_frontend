import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { JwtInterceptor } from './shared/shared_service/jwt.interceptor';
import { provideToastr } from 'ngx-toastr';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([JwtInterceptor])),
  provideAnimations(), provideToastr(), importProvidersFrom(BrowserModule),
  importProvidersFrom(BrowserAnimationsModule), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};
