import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];

  totalPrice : Subject<number> = new Subject<number>();

  totalQuantity : Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    //Check if we already have the item in our cart
    let alreadyExsist : boolean = false;
    let existingCartItem : CartItem = undefined;
    //find the item in the cart based on item id
    if(this.cartItems.length > 0){
      for(let cartItem of this.cartItems){
        if(cartItem.id == theCartItem.id){
          existingCartItem = cartItem;
          alreadyExsist = true;
          break;
        }
      }
    }
    //check if we found it
    if(alreadyExsist){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

  }
  computeCartTotals(){
    let totalPrice:number = 0;
    let totalQuantity: number = 0;
    for(let cartItem of this.cartItems){
      totalPrice += cartItem.unitPrice * cartItem.quantity;
      totalQuantity += cartItem.quantity;
    }
    //Publishing Events
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
    this.logCart(totalPrice,totalQuantity)
  }

  logCart(totalPrice:number, totalQ:number){
    for(let cartitem of this.cartItems){
      console.log(cartitem.id+" "+(cartitem.unitPrice * cartitem.quantity) +" "+cartitem.quantity)
    }
    console.log("Totals:&&&&&&&&&&&&&&&&&&&&&& "+totalPrice+" "+totalQ);
  }
}
