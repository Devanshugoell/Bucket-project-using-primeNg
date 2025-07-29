import { NgClass } from "@angular/common";
import { Component, Output, EventEmitter } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { UserService } from "../service/user.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [ButtonModule, SidebarModule, NgClass, TranslateModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  @Output() languageChanged = new EventEmitter<string>();
  sidebarVisiblewithName = false;
  sidebarVisible: boolean = true;

  constructor(private userService: UserService) {}

  onLogout() {
    this.userService.logout();
  }

  sidebarFunction() {
    this.sidebarVisiblewithName = !this.sidebarVisiblewithName;
  }

  emitLanguageChange(lang: string) {
    this.languageChanged.emit(lang);
  }
}
