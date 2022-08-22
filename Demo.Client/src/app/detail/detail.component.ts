import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  baseUrl!:string
  productName!: string 
  price!:number 
  response!: string;
  description!:string 
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

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44315/${serverPath}`; 
  }
}
