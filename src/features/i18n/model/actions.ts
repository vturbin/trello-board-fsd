import { createAction, props } from "@ngrx/store";
import { Lang } from "./store";

export const setLanguage = createAction(
  "[Language] Set Language",
  props<{ lang: Lang }>(),
);
