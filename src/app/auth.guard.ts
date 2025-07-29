import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem("refresh_token");

  if (!isLoggedIn) {
    return router.parseUrl("/"); // Redirect to login
  }

  return true;
};
