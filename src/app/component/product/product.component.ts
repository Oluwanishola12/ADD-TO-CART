import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent {


  public productlist : any ;
  constructor (private api : ApiService, private cartService: CartService){}

ngOnInit(): void {
  this.api.getProduct()
  .subscribe(res=>{
    this.productlist = res;
    this.productlist.forEach((a :any)=>{
      Object.assign(a, {quatity:1, total:a.price});
    });
  })
}

addtocart(item : any){
this.cartService.addToCart(item)
}

}
