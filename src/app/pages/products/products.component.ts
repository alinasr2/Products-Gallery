import { Component, HostListener, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product/product';
import { ProductFilterComponent } from "../../components/product-filter/product-filter.component";
import { ErrorMessageComponent } from "../../components/error-message/error-message.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-products',
  imports: [ProductFilterComponent, ErrorMessageComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  error = false;
  showScrollButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.isLoading = false;
      },
      error: () => {
        this.error = true;
        this.isLoading = false;
      }
    });
  }

  onSearch(searchTerm: string) {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onSort(sortOption: string) {
    switch (sortOption) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        this.filteredProducts = [...this.products];
    }
  }


  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}