import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { InputGroupModule } from "primeng/inputgroup";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

interface NewItem {
  id: number;
  fruits: number | null;
  vegetable: number | null;
  drinks: number | null;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [ButtonModule, TableModule, InputGroupModule, FormsModule, NgIf],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {
  showInputGroup: boolean = false;
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

  AddItem() {
    if (this.newItem) {
      this.products.push({ ...this.newItem });

      this.newItem = {
        id: Math.floor(Math.random() * 1000),
        fruits: null,
        vegetable: null,
        drinks: null,
      };
    }
  }
}
