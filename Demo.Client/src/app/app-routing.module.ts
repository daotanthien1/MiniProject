import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '',canActivate:[AuthGuard],component:HomeComponent,pathMatch:"full"},
  { path: 'login',component:AuthComponent },
  { path: 'register',component:RegisterComponent },
  { path: 'home',canActivate:[AuthGuard],component:HomeComponent },
  { path: 'product',canActivate:[AuthGuard],component:ProductComponent },
  { path: 'edit/:id',canActivate:[AuthGuard],component:EditComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
