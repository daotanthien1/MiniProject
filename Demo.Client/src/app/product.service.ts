import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'interfaces/login';
import { Product } from 'interfaces/product';
import { ProductUpd } from 'interfaces/productUpd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  user!:any
  form!:NgForm
  routeID!: any
  baseUrl!: string
  token!: any
  uName!:any

  constructor(private http:HttpClient,
              private router: Router,
              private route: ActivatedRoute){ 
    this.baseUrl = "https://localhost:44315/api/products" 
    this.token = localStorage.getItem('token')
  } 


  public GetToken() : any{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    const httpOptions = {
      headers: headers_object
    };
    return httpOptions
  }
  
  public GetProduct() : any{
    return this.http.get<any[]>(this.baseUrl,this.GetToken())
  }

  public DeleteProduct(id:number) : any{
    return this.http.delete<any[]>(`${this.baseUrl}/${id}`,this.GetToken())
  }

  public UpdateProduct(id:number,productUpd:ProductUpd) : any{
    return this.http.put<any[]>(`${this.baseUrl}/${id}`,productUpd,this.GetToken())
  }

  public CreateProduct(product:Product) : any{
    return this.http.post<any[]>(`${this.baseUrl}/create`,product,this.GetToken())
  }

  public GetProductById(id:number) : any{
    return this.http.get<any>(`${this.baseUrl}/${id}`,this.GetToken())
  }

  public OnLogin(form:Login) : Observable<any>{
    return this.http.post('https://localhost:44315/api/auth/login',form,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
  }
}
