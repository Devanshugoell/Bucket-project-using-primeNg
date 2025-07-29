import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserService } from "../service/user.service";
import { NotificationService } from "../service/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const userData = {
        ...formData,
        avatar: "https://api.lorem.space/image/face?w=150&h=150",
      };

      this.userService.register(userData).subscribe({
        next: () => {
          this.userService.login(formData).subscribe({
            next: () => {
              this.notificationService.success("Registration  successful");
              this.router.navigate(["/main"]);
            },
            error: () => {
              this.notificationService.warn("Login failed after registration");
            },
          });
        },
        error: () => {
          this.notificationService.warn("Registration failed");
        },
      });
    } else {
      this.notificationService.warn("Please fill all fields correctly");
    }
  }
}
