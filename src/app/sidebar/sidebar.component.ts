import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [ButtonModule, SidebarModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  sidebarVisiblewithName: boolean = false;
}
