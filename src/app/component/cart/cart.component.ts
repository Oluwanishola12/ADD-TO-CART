import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

public products : any = [];
public grandTotal !: number;


constructor(public router:Router, private cartService: CartService){}

ngOnInit() :void {
this.cartService.getProduct()
.subscribe(res=>{
  this.products = res;
  this.grandTotal= this.cartService.getTotalPrice();
})
}

removeItem(item: any){
this.cartService.removeCartItem(item);
console.log("hello");

}

emptyCart(){
  this.cartService.removeAllCart();
}

goShop(){
  this.router.navigateByUrl('product')
}

}
