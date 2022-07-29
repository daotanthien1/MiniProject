import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username!: string
  password!: string
  confirmPassword!: string
  email!: string
  constructor(private http:HttpClient,
              private route:Router) { }

  ngOnInit(): void {
  }

  public onRegister(form: NgForm): any{
    debugger
    this.http.post("https://localhost:44315/api/auth/register",form.value).subscribe(
      data => {
        if(data){
          this.route.navigate(['/home'])
        }
      }
    )
  }
}
