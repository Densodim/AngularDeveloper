import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideState, provideStore} from '@ngrx/store';
import {dataFeature} from '../store/data.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideStore(),
    provideState(dataFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
