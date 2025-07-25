import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [ButtonModule, SidebarModule, NgClass],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  sidebarVisiblewithName = false;
  sidebarVisible: boolean = true;
  sidebarFunction() {
    this.sidebarVisiblewithName = !this.sidebarVisiblewithName;
  }
}
