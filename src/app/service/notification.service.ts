import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor(private messageService: MessageService) {}

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  success(detail: string, summary: string = "Success") {
    this.show("success", summary, detail);
  }

  error(detail: string, summary: string = "Error") {
    this.show("error", summary, detail);
  }

  warn(detail: string, summary: string = "Warning") {
    this.show("warn", summary, detail);
  }
}
