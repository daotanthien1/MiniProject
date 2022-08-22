import { HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { Product } from 'interfaces/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent{
  baseUrl:string
  progress!: number
  message!: string
  productName!: string 
  price!:number 
  description!:string 
  product!: Product
  response!: {dbPath: ''};
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http:HttpClient,
              private service:ProductService,
              private route:Router) { 
    this.baseUrl = "https://localhost:44315/api/products"
  }

  public onSubmit(form: NgForm){
    this.product = {
      productName: this.productName,
      price:this.price,
      description:this.description,
      imageUrl:this.response.dbPath
    }
    this.service.CreateProduct(this.product).subscribe(
      (data: any) => console.log(data)
    )
    this.route.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });;
  }

  public uploadFinished = (event : any) => { 
    this.response = event;
    console.log(this.response)
  }
}
