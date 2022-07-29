import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  display!: any
  constructor(private service:ProductService) {
    var userName = localStorage.getItem('user')
    if(userName != null)
      this.display = userName
  }

  ngOnInit(): void {
  }
  public onLogOut() : void {
    localStorage.clear();
    location.reload();
  }
}
