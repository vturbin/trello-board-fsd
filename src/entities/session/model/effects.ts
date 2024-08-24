import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as SessionActions from "./actions";
import { api } from "../../../shared/api";
import { ActivatedRoute, Router } from "@angular/router";
import { ROUTER_PATHS } from "@shared/constants";

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loadSession),
      mergeMap(() =>
        from(api.getSession()).pipe(
          map(session => SessionActions.loadSessionSuccess({ session })),
          catchError(error =>
            of(SessionActions.loadSessionFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadSessionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SessionActions.loadSessionSuccess),
        map(() => {
          if (this.router.url.includes(ROUTER_PATHS.SIGN_IN)) {
            this.router.navigate([""]);
          }
        }),
      ),
    { dispatch: false },
  );

  noSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SessionActions.loadSessionFailure, SessionActions.removeSession),
        map(() => this.router.navigate([ROUTER_PATHS.SIGN_IN])),
      ),
    { dispatch: false },
  );
}
