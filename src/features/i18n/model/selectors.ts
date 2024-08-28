import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LanguageState } from "./store";

export const selectLanguageState =
  createFeatureSelector<LanguageState>("language");

export const selectLanguage = createSelector(
  selectLanguageState,
  state => state.lang,
);
