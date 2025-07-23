import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { NgStyle } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ButtonModule, SidebarModule, NgStyle],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  sidebarVisible: boolean = false;
  sidebarVisiblewithName: boolean = false;
}
