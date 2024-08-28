import { createReducer, on } from "@ngrx/store";
import * as LanguageActions from "./actions";

export type Lang = "en" | "de";

export interface LanguageState {
  lang: Lang;
}

export const initialState: LanguageState = {
  lang: (localStorage.getItem("lang") as Lang) || "en",
};

export const languageReducer = createReducer(
  initialState,
  on(LanguageActions.setLanguage, (state, { lang }) => {
    localStorage.setItem("lang", lang);
    return { ...state, lang };
  }),
);
