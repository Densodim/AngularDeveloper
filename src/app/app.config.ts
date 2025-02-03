import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core"
import { provideRouter } from "@angular/router"
import { routes } from "./app.routes"
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser"
import { provideHttpClient } from "@angular/common/http"
import { provideStoreDevtools } from "@ngrx/store-devtools"
import { provideState, provideStore } from "@ngrx/store"
import { dataReducer } from "../store/data/data.reducer"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { providePrimeNG } from "primeng/config"
import Aura from "@primeng/themes/aura"
import { fileReducer } from "../store/file/file.reducer"
import { provideEffects } from "@ngrx/effects"
import { FileEffects } from "../store/file/file.effects"
import { MessageService } from "primeng/api"

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideStore(),
    provideState(dataReducer),
    provideState(fileReducer),
    provideEffects({ FileEffects }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
}
