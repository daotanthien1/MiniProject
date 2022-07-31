import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: number = 1
  itemsToDisplay: number = 4
  data: any = []
  routeID!: any;
  currentItem!:any;
  constructor(private service:ProductService){ 
    this.service.GetProduct().subscribe(  
      (datas: any) => {
        this.data = datas
      }
    )
  } 

  ngOnInit(): void {
  }
  
  
}
