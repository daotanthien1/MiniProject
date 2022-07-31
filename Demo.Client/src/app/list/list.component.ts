import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  stock!:number
  page: number = 1
  itemsToDisplay: number = 4
  data: any = []
  keyword!:string
  routeID!: any;
  currentItem!:any;
  constructor(private service:ProductService){ 

  }

  ngOnInit(): void {
    this.service.GetProduct().subscribe(  
      (datas: any) => {
        this.data = datas
      }
    )
  }
  public onLogOut() : void {
    localStorage.clear();
    location.reload();
  }

  public onDelete(id:number){
    this.service.DeleteProduct(id).subscribe()
    location.reload()
  }
  
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44315/${serverPath}`; 
  }

  public pagedChanged(event: any){
    this.page = event
  }
  
  public resSearch(prop:any){
    this.data = prop
  }
}
