import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent {
  @Output() search = new EventEmitter<string>();
  @Output() sort = new EventEmitter<string>();
  
  searchTerm = '';
  sortOption = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onSort() {
    this.sort.emit(this.sortOption);
  }
}
