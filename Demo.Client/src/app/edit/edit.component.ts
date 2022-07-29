import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUpd } from 'interfaces/productUpd';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  baseUrl!:string
  productName!: string 
  price!:number 
  response!: {dbPath: ''};
  description!:string 
  product!: ProductUpd
  routeID!: any;

  constructor(private router:Router,
              private service:ProductService,
              private route: ActivatedRoute){ 
    this.baseUrl = "https://localhost:44315/api/products"
    this.route.params.subscribe(params => {
      this.routeID = params
    }); 
  }

  ngOnInit(): void {
    this.service.GetProductById(this.routeID['id']).subscribe( 
      (data: any) => {
        this.productName = data.productName,
        this.price = data.price,
        this.description = data.description
        this.response = data.imageUrl
      }
    )
  }

  public onEdit(form: NgForm){
    this.product = {
      productName: this.productName,
      price:this.price,
      description:this.description,
      imageUrl:this.response.dbPath
    }
    this.service.UpdateProduct(this.routeID['id'],this.product).subscribe(
      (data: any) => console.log(data)
    )
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });;
  }

  public uploadFinished = (event : any) => { 
    this.response = event;
    console.log(this.response)
  }
}
