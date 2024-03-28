import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { UriConfig } from './config/URIconfig';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { InterceptorService } from './services/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent
  ],
  providers: [LoginService, UriConfig,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ]
})
export class AppModule { }
