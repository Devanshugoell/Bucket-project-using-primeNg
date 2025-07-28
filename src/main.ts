import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component"; // or RootComponent if that's your entry
import { appConfig } from "./app/app.config";
import { TranslateService } from "@ngx-translate/core";

bootstrapApplication(AppComponent, appConfig)
  .then((ref) => {
    const injector = ref.injector;
    const translate = injector.get(TranslateService);
    translate.addLangs(["en", "hi"]);
    translate.setDefaultLang("en");
    translate.use("en"); // or 'hi' if you want Hindi default
  })
  .catch((err) => console.error(err)); // ✅ error handling
