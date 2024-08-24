import { Routes } from "@angular/router";
import { ROUTER_PATHS } from "@shared/constants";

export const routes: Routes = [
  {
    path: ROUTER_PATHS.SIGN_IN,
    loadComponent: () =>
      import("../pages/sign-in").then(m => m.SignInPageComponent),
  },
  {
    path: "board",
    loadComponent: () =>
      import("../pages/boards").then(m => m.BoardsPageComponent),
  },
  {
    path: "user",
    loadComponent: () =>
      import("../pages/users").then(m => m.UsersPageComponent),
  },
  { path: "**", redirectTo: "board" },
];
