import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastService } from "@shared/ui/toast/toast.service";
import { MessageService } from "primeng/api";
import { UsersEffects, usersReducer } from "@entities/user";
import { SessionEffects, sessionReducer } from "@entities/session";
import { BoardEffects, boardReducer } from "@entities/board";
import { TasksEffects, tasksReducer } from "@entities/task";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { Ability, PureAbility } from "@casl/ability";
import { AbilityService } from "@casl/angular";

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./app/assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      user: usersReducer,
      session: sessionReducer,
      boards: boardReducer,
      task: tasksReducer,
    }),
    provideEffects([UsersEffects, SessionEffects, TasksEffects, BoardEffects]),
    ToastService,
    MessageService,
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: "en",
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
    AbilityService,
  ],
};
