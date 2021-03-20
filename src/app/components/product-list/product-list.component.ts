import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId : number = 1;
  currentCategory : string;
  searchMode : boolean = false;
  hasCategoryName:boolean = false;

  // Properties for pagination
  pageNumber : number = 1;
  pageSize : number = 8;
  totalElements : number = 0;

  constructor(private productService: ProductService, 
              private route:ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      data => {
        this.listProducts();
      }
    );
  }
  onChangePageSize(size: number){
    this.pageSize = size;
    this.pageNumber = 1;
    this.listProducts();
  }
  handleListProducts(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    this.hasCategoryName = this.route.snapshot.paramMap.has('name');
    if(this.hasCategoryName){
      this.currentCategory = this.route.snapshot.paramMap.get('name');
    }
    else{
      this.currentCategory = 'All';
      this.hasCategoryName = true;
    }
    

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    //
    //Check if we have a different category than previous
    //Note  : Angular will always reuse the comonent already rendered in the screen
    //We may need to take charge of updateing it based on some scenario ex: Change of category
    //
      if(this.previousCategoryId != this.currentCategoryId){
        this.pageNumber = 1;
      }
      this.previousCategoryId = this.currentCategoryId;
    //Paginated Category Wise Product Listing
      this.productService.getProductsByCategoryIdPage(
                                          this.pageNumber - 1, 
                                          this.pageSize,
                                          this.currentCategoryId)
                                          .subscribe(
        data => {
          this.products = data.content;
          this.pageNumber = data.number + 1;
          this.pageSize = data.size;
          this.totalElements = data.totalElements;
        }
      );
    }
    else{
      this.productService.getProductList(this.pageNumber - 1,this.pageSize).subscribe(
        data => {
          this.products = data.content;
          this.pageNumber = data.number + 1;
          this.pageSize = data.size;
          this.totalElements = data.totalElements;
        }
      );
    }
  }
  handleSearchProducts(){
    this.hasCategoryName = false;
    const key:string = this.route.snapshot.paramMap.get('key');
    this.productService.searchProducts(key,this.pageNumber - 1, this.pageSize).subscribe(
      data => {
        this.products = data.content;
        this.pageNumber = data.number +  1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      }
    );
  }
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('key');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  addToCart(product:Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
