import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {
    this.loadCartItems();
  }

  // To get Product details
  getProduct() {
    return this.productList.asObservable();
  }

  // To set Product details
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    this.saveCartItems();
  }

  // To add Product details
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.saveCartItems();
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  // To getTotal price of Product details
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  // To remove Product details
  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((a: any) => a.id !== product.id);
    this.productList.next(this.cartItemList);
    this.saveCartItems();
  }

  // To remove all Product details
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.saveCartItems();
  }

  private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItemList = JSON.parse(savedCartItems);
      this.productList.next(this.cartItemList);
    }
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }
}
