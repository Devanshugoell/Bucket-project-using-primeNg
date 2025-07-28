import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem("refresh_token");
    this.router.navigate(["/"]);
  }

  login(data: any): Observable<any> {
    return this.http
      .post<{ refresh_token: string }>(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      )
      .pipe(
        tap((result) => {
          localStorage.setItem("refresh_token", result.refresh_token);
          this.router.navigate(["/main"]);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
