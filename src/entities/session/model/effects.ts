import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SessionActions from './actions';
import { api } from '../../../shared/api';

@Injectable()
export class SessionEffects {
  constructor(private actions$: Actions) {}

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loadSession),
      mergeMap(() =>
        from(api.getSession()).pipe(
          map(session => SessionActions.loadSessionSuccess({ session })),
          catchError(error => of(SessionActions.loadSessionFailure({ error }))),
        ),
      ),
    ),
  );
}
