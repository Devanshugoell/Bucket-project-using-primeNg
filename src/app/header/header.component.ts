import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  // ngOnInit(): void {
  //   const storedProducts = localStorage.getItem("products");
  //   const products = storedProducts ? JSON.parse(storedProducts) : [];
  //   this.totalFruits = products.reduce((sum, p) => sum + (p.fruits || 0), 0);
  //   this.totalVegetables = products.reduce(
  //     (sum, p) => sum + (p.vegetable || 0),
  //     0
  //   );
  // }
}
