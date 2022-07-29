import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'interfaces/login';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  username!: string
  password!: string
  rememberMe!: boolean
  message!: string
  info!:Login
  constructor(private route:Router,
              private service:ProductService) {}
                           
  ngOnInit(): void {
    
  }

  public onLogin(form:NgForm) : any{
    this.info = {
      username: this.username,
      password: this.password
    }
    if(this.username != undefined && this.password != undefined){
      this.service.OnLogin(this.info).subscribe(
        (data: any) => {
          if(data != null){
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',data.username);
            this.route.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }              
        }    
      )
    }
    else{
      this.route.navigate(['/login']);
      this.message = "Username and password cannot empty!"
    }
  }
}
