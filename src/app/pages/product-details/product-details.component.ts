import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { ErrorMessageComponent } from "../../components/error-message/error-message.component";
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from '../../interfaces/product/product';

@Component({
  selector: 'app-product-details',
  imports: [ ErrorMessageComponent, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }),
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ]
})
export class ProductDetailsComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  product: Product  = {} as Product;
  isLoading = true;
  error = false;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false;
        },
        error: () => {
          this.error = true;
          this.isLoading = false;
        }
      });
    }
  }
}