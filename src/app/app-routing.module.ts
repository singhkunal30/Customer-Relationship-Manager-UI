import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { CreateContactComponent } from './components/contact/create-contact/create-contact.component';

const routes:Routes = [  
  { path: '', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component:HomeComponent},
  { path: 'contacts', component: ContactComponent},
  { path: 'contacts/create', component: CreateContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
