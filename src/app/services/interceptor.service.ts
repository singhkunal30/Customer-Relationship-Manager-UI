import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  token = sessionStorage.getItem("jwtToken");
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes("/authenticate/auth")){
      return next.handle(request);
    }
    console.log(this.token);
    const modifiedRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(modifiedRequest);
  }
}
