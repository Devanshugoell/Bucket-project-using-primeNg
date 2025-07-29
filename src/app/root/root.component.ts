import { Component } from "@angular/core";
import { MainComponent } from "../main/main.component";
import { TranslateService } from "@ngx-translate/core";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [MainComponent, SidebarComponent],
  templateUrl: "./root.component.html",
  styleUrl: "./root.component.css",
})
export class RootComponent {
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem("lang") || "en";
    translate.setDefaultLang("en");
    translate.use(savedLang);
  }

  changeLanguage(lang: string) {
    if (lang === "en" || lang === "hi") {
      this.translate.use(lang);
      localStorage.setItem("lang", lang);
    }
  }
}
