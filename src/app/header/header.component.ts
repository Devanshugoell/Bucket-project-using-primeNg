import { Component } from "@angular/core";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  products: any[] = [];

  totalDrinks: number | null = null;

  ngOnInit(): void {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);

      // Calculate total drinks
      this.totalDrinks = this.products.reduce((sum, item) => {
        return sum + (item.drinks || 0);
      }, 0);
    }

    console.log("Products:", this.products);
    console.log("Total Drinks:", this.totalDrinks);
  }
}
