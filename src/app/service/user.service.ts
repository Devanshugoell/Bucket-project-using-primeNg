import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem("refresh_token");
    this.router.navigate(["/"]);
  }

  login(data: any) {
    this.http
      .post<{ refresh_token: string }>(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      )
      .subscribe({
        next: (result) => {
          localStorage.setItem("refresh_token", result.refresh_token);
          this.router.navigate(["/main"]);
        },
        error: (err) => {
          alert("Either Email or password is incorrect");
        },
      });
  }
}
