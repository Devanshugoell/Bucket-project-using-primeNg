import { Component } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule, NgClass } from "@angular/common";
import { UserService } from "../service/user.service";
import { NotificationService } from "../service/notification.service";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-login",
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, NgClass, ButtonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm: FormGroup;
  spinner = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    if (localStorage.getItem("refresh_token")) {
      this.router.navigate(["/main"]);
    }

    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  userLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.spinner = true;

      this.userService.login(formData).subscribe({
        next: () => {
          this.notificationService.success("Login successful");
          this.spinner = false;
          this.router.navigate(["/main"]);
        },
        error: () => {
          this.notificationService.warn(
            "Either Email or password is incorrect"
          );
          this.spinner = false;
        },
      });
    } else {
      this.notificationService.warn("Please enter valid credentials");
    }
  }
}
