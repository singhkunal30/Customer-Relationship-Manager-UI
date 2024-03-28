import { Inject, Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { JwtToken } from 'src/app/model/JwtToken';
import { ErrorDTO } from 'src/app/model/Error';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  jwtToken:any= sessionStorage.getItem("jwtToken");
  response:boolean = false;
  error:ErrorDTO = new ErrorDTO();
  jT:JwtToken = new JwtToken();
  exception:boolean = false;
  constructor(private loginService:LoginService,@Inject(Router) private router:Router) {}

  isAuthenticated(): boolean {
    if(this.jwtToken!=null){
      this.jT.token = this.jwtToken;
      this.loginService.validateToken(this.jT).subscribe(
        (res)=>{
          this.response = res;
        },
        (err)=>{
          this.exception = true;
          this.error.errorMessage = err.error.message;
          this.error.errorCode = err.error.error_code;
          console.log(err.error);
        });
      return this.response;
    }
    return false;
  }

  logout():void{
    sessionStorage.removeItem("jwtToken");
    this.router.navigateByUrl("/login");
  }
}
