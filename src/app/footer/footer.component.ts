import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { InputGroupModule } from "primeng/inputgroup";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

interface NewItem {
  id: number;
  fruits: number | null;
  vegetable: number | null;
  drinks: number | null;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    InputGroupModule,
    FormsModule,
    NgIf,
    ToastModule,
  ],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
  providers: [MessageService],
})
export class FooterComponent {
  showWarning: boolean = false;
  showInputGroup: boolean = false;

  constructor(public messageService: MessageService) {}

  newItem: NewItem = {
    id: Math.floor(Math.random() * 1000),
    fruits: null,
    vegetable: null,
    drinks: null,
  };

  products: any = [
    {
      id: Math.floor(Math.random() * 1000),
      fruits: Math.floor(Math.random() * 1000),
      vegetable: Math.floor(Math.random() * 1000),
      drinks: Math.floor(Math.random() * 1000),
    },
    {
      id: Math.floor(Math.random() * 1000),
      fruits: Math.floor(Math.random() * 1000),
      vegetable: Math.floor(Math.random() * 1000),
      drinks: Math.floor(Math.random() * 1000),
    },
  ];

  ngOnInit() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      localStorage.setItem("products", JSON.stringify(this.products));
    }
  }

  showToaster(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  AddItem() {
    if (
      this.newItem.fruits == 0 &&
      this.newItem.drinks == 0 &&
      this.newItem.vegetable == 0
    ) {
      this.showToaster("warn", "WARN", "The value must be greater than 0");
      return;
    } else if (
      this.newItem.fruits !== null &&
      this.newItem.drinks !== null &&
      this.newItem.vegetable !== null
    ) {
      this.products.push({ ...this.newItem });
      this.showToaster("success", "Success", "Successfully Added");
      localStorage.setItem("products", JSON.stringify(this.products));

      this.showInputGroup = false;
      this.newItem = {
        id: Math.floor(Math.random() * 1000),
        fruits: null,
        vegetable: null,
        drinks: null,
      };
    }
  }
}
