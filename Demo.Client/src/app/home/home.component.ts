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
  baseUrl!:string
  routeID!: any;
  currentItem!:any;
  constructor(private service:ProductService){ 
    this.baseUrl = "https://localhost:44315/api/products"
    this.service.GetProduct().subscribe(  
      (datas: any) => {
        this.data = datas
      }
    )

  } 

  ngOnInit(): void {
  }
  
  public onDelete(id:number){
    this.service.DeleteProduct(id).subscribe()
    location.reload()
  }
  
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44315/${serverPath}`; 
  }

  public PagedChanged(event: any){
    this.page = event
  }

  public onSearch(keyword:string): any{
    this.service.SearchProduct(keyword).subscribe(
      (datas: any) => {
        this.data = datas
      } 
    )
  }
}
