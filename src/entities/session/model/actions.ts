import { createAction, props } from '@ngrx/store';
import { Session } from './types';

export const loadSession = createAction('[Session] Load Session');
export const loadSessionSuccess = createAction(
  '[Session] Load Session Success',
  props<{ session: Session }>(),
);
export const loadSessionFailure = createAction(
  '[Session] Load Session Failure',
  props<{ error: any }>(),
);

export const setCurrentSession = createAction(
  '[Session] Set Current Session',
  props<{ session: Session }>(),
);

export const removeSession = createAction('[Session] Remove Session');
