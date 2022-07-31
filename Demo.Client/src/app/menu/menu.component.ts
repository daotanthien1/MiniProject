import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  display!: any
  data:any = []
  @Output() getSearchProp = new EventEmitter<any>();
  constructor(private service:ProductService,
              private route:Router) {
    var userName = localStorage.getItem('user')
    if(userName != null)
      this.display = userName
  }

  ngOnInit(): void {
    if(this.data == null){
      this.route.navigate(['/login']);
    }
  }
  public onLogOut() : void {
    localStorage.clear();
    location.reload();
  }
  
  public onSearch(keyword:string): any{
    this.service.SearchProduct(keyword).subscribe(
      (datas: any) => {
        this.data = datas
        this.getSearchProp.emit(datas)
      } 
    )
  }
}
