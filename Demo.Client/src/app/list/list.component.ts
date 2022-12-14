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
        this.data = datas.sort(function(x:any,y:any){
          return y.price - x.price
        }).filter((datas:any) => datas.price >= 1)
      }
    )
    this.autoLogout(300000)
  }

  public onLogOut() : void {
    localStorage.removeItem('token');
    location.reload();
  }

  public autoLogout(time:number) : void{
    setTimeout(() => {
      this.onLogOut();
    }, time);
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
