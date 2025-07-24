import { Component, DoCheck } from "@angular/core";
import { NgFor } from "@angular/common";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor, CardModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements DoCheck {
  products: any[] = [];

  totalDrinks = 0;
  totalFruits = 0;
  totalVegetables = 0;

  private lastStoredProducts = "";

  ngOnInit(): void {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.lastStoredProducts = storedProducts;
    }
    this.calculateTotals();
  }

  ngDoCheck(): void {
    const currentStoredProducts = localStorage.getItem("products");

    if (
      currentStoredProducts &&
      currentStoredProducts !== this.lastStoredProducts
    ) {
      this.products = JSON.parse(currentStoredProducts);
      this.lastStoredProducts = currentStoredProducts;
      this.calculateTotals();
    }
  }

  private calculateTotals(): void {
    this.totalDrinks = this.products.reduce(
      (sum, item) => sum + Number(item.drinks || 0),
      0
    );
    this.totalFruits = this.products.reduce(
      (sum, item) => sum + Number(item.fruits || 0),
      0
    );
    this.totalVegetables = this.products.reduce(
      (sum, item) => sum + Number(item.vegetable || 0),
      0
    );
  }
}
