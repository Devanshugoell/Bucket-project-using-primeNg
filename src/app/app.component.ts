import { Component } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MainComponent } from "./main/main.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SidebarComponent, MainComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
