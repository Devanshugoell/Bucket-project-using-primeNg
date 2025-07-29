import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root/root.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "main",
    component: RootComponent,
    canActivate: [authGuard],
  },
];
