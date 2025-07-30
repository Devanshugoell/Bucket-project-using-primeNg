import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { InputGroupModule } from "primeng/inputgroup";
import { FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";

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
    DialogModule,
    CommonModule,
    InputTextModule,
    TranslateModule,
    AutoCompleteModule,
    ButtonModule,
    TableModule,
    InputGroupModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
  providers: [MessageService],
})
export class FooterComponent {
  isEditing: boolean = false;
  backupEditedItem: NewItem | null = null;
  searchTerm: string = "";
  filteredProducts: any[] = [];

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
      fruits: Math.floor(Math.random() * 20),
      vegetable: Math.floor(Math.random() * 20),
      drinks: Math.floor(Math.random() * 20),
    },
    {
      id: Math.floor(Math.random() * 1000),
      fruits: Math.floor(Math.random() * 20),
      vegetable: Math.floor(Math.random() * 20),
      drinks: Math.floor(Math.random() * 20),
    },
    {
      id: Math.floor(Math.random() * 1000),
      fruits: Math.floor(Math.random() * 20),
      vegetable: Math.floor(Math.random() * 20),
      drinks: Math.floor(Math.random() * 20),
    },
  ];

  ngOnInit() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      localStorage.setItem("products", JSON.stringify(this.products));
    }

    this.filteredProducts = [...this.products];
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
      this.newItem.fruits == 0 ||
      this.newItem.fruits == null ||
      this.newItem.vegetable == 0 ||
      this.newItem.vegetable == null ||
      this.newItem.drinks == 0 ||
      this.newItem.drinks == null
    ) {
      this.showToaster("warn", "WARN", "The value must be greater than 0");
      return;
    }

    if (this.isEditing) {
      const index = this.products.findIndex(
        (p: any) => p.id === this.newItem.id
      );
      if (index !== -1) {
        this.products[index] = { ...this.newItem };
      }
      this.showToaster("success", "Updated", "Successfully Updated");
    } else {
      this.products.push({ ...this.newItem });
      this.showToaster("success", "Success", "Successfully Added");
    }

    this.filteredProducts = this.filterBySearchTerm(this.searchTerm);
    localStorage.setItem("products", JSON.stringify(this.products));

    this.showInputGroup = false;
    this.isEditing = false;
    this.newItem = {
      id: Math.floor(Math.random() * 1000),
      fruits: null,
      vegetable: null,
      drinks: null,
    };
  }

  handleDelete(id: number, isEditing?: string): void {
    this.products = this.products.filter((product: any) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(this.products));
    this.filteredProducts = this.filterBySearchTerm(this.searchTerm);
    if (isEditing === "editing") {
      return;
    }
    this.showToaster("success", "Deleted", "Item has been deleted");
  }

  handleEdit(product: NewItem, id: number): void {
    this.backupEditedItem = { ...product };
    this.showInputGroup = true;
    this.isEditing = true;
    this.newItem = {
      id: product.id,
      fruits: product.fruits,
      vegetable: product.vegetable,
      drinks: product.drinks,
    };
  }

  filterTable(event: any) {
    const query = event.query?.toLowerCase() || "";

    if (!query.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(
      (product: any) =>
        product.id.toString().includes(query) ||
        product.fruits?.toString().includes(query) ||
        product.vegetable?.toString().includes(query) ||
        product.drinks?.toString().includes(query)
    );
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filteredProducts = this.filterBySearchTerm(this.searchTerm);
  }

  filterBySearchTerm(search: string): any[] {
    const query = search.toLowerCase();
    if (!query.trim()) {
      return [...this.products];
    }

    return this.products.filter(
      (product: any) =>
        product.id.toString().includes(query) ||
        product.fruits?.toString().includes(query) ||
        product.vegetable?.toString().includes(query) ||
        product.drinks?.toString().includes(query)
    );
  }

  cancelEdit(): void {
    this.backupEditedItem = null;

    this.showInputGroup = false;
    this.isEditing = false;

    this.newItem = {
      id: Math.floor(Math.random() * 1000),
      fruits: null,
      vegetable: null,
      drinks: null,
    };
  }
}
