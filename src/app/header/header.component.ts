import { Component, DoCheck } from "@angular/core";
import { NgFor } from "@angular/common";
import { CardModule } from "primeng/card";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from "@angular/animations";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgFor, CardModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  animations: [
    trigger("cardEnter", [
      transition("* => *", [
        query(
          ".card-item",
          [
            style({
              opacity: 0,
              transform: "translateY(30px) scale(0.9)",
            }),
            stagger(150, [
              animate(
                "0.6s cubic-bezier(0.35, 0, 0.25, 1)",
                style({
                  opacity: 1,
                  transform: "translateY(0) scale(1)",
                })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    trigger("cardHover", [
      state(
        "default",
        style({
          transform: "scale(1) translateY(0)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        })
      ),
      state(
        "hovered",
        style({
          transform: "scale(1.05) translateY(-8px)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        })
      ),
      transition("default <=> hovered", [
        animate("0.3s cubic-bezier(0.4, 0, 0.2, 1)"),
      ]),
    ]),

    trigger("numberCount", [
      transition(":increment", [animate("0.5s ease-out")]),
    ]),

    trigger("pulse", [
      state(
        "inactive",
        style({
          transform: "scale(1)",
        })
      ),
      state(
        "active",
        style({
          transform: "scale(1.02)",
        })
      ),
      transition("inactive <=> active", [animate("0.4s ease-in-out")]),
    ]),
  ],
})
export class HeaderComponent implements DoCheck {
  products: any[] = [];

  totalDrinks = 0;
  totalFruits = 0;
  totalVegetables = 0;

  private lastStoredProducts = "";

  cardStates = {
    buckets: "default",
    fruits: "default",
    vegetables: "default",
    drinks: "default",
  };

  animationTrigger = true;

  ngOnInit(): void {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.lastStoredProducts = storedProducts;
    }
    this.calculateTotals();

    setTimeout(() => {
      this.animationTrigger = !this.animationTrigger;
    }, 100);
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

  onCardHover(cardType: string) {
    this.cardStates[cardType as keyof typeof this.cardStates] = "hovered";
  }

  onCardLeave(cardType: string) {
    this.cardStates[cardType as keyof typeof this.cardStates] = "default";
  }

  onCardClick(cardType: string) {
    const currentState =
      this.cardStates[cardType as keyof typeof this.cardStates];
    this.cardStates[cardType as keyof typeof this.cardStates] = "active";

    setTimeout(() => {
      this.cardStates[cardType as keyof typeof this.cardStates] = currentState;
    }, 200);
  }
}
