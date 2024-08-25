import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as UsersActions from "./actions";
import { User } from "./types";
import { api } from "../../../shared/api";
import { ToastService } from "@shared/ui/toast";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        from(api.getUsers()).pipe(
          map((users: User[]) => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error }))),
        ),
      ),
    ),
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.removeUser),
      mergeMap(({ userId }) =>
        from(api.deleteUser(userId)).pipe(
          map(() => UsersActions.removeUserSuccess({ userId })),
          catchError(error => of(UsersActions.removeUserFailure({ error }))),
        ),
      ),
    ),
  );
}
