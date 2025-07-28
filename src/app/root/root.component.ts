import { Component } from "@angular/core";
import { MainComponent } from "../main/main.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [MainComponent, SidebarComponent],
  templateUrl: "./root.component.html",
  styleUrl: "./root.component.css",
})
export class RootComponent {}
