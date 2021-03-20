import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get handle of cart items
    this.cartItems = this.cartService.cartItems;
    //subscribe to total price
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data
    );
    //subscribe to total qty
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity = data
    );
    //compute cart total
    this.cartService.computeCartTotals();
  }

  incrementQty(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQty(cartItem: CartItem){
    this.cartService.decrementQty(cartItem);
  }
  removeItem(cartItem: CartItem){
    this.cartService.removeCartItem(cartItem);
  }

}
