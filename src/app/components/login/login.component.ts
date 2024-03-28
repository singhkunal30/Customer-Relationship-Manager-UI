import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDTO } from 'src/app/model/Error';
import { JwtToken } from 'src/app/model/JwtToken';
import { JwtRequest } from 'src/app/model/JwtRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtRequest: JwtRequest = new JwtRequest(); 
  exception: boolean = false;
  error:ErrorDTO = new ErrorDTO();
  jwtToken: JwtToken = new JwtToken();
  constructor(private loginService:LoginService, @Inject(Router) private router:Router) { }

  ngOnInit(): void {
    this.exception = false;
  }

  login():void{
    this.loginService.login(this.jwtRequest).subscribe(
      (res) => {
        this.jwtToken = res;
        this.loginService.saveToken(this.jwtToken.token);
        setTimeout(()=>{
          this.router.navigateByUrl("/contacts"),2000})
      },
      (err) => {
        this.exception = true;
        this.error.errorMessage = err.error.message;
        this.error.errorCode = err.error.error_code;
      }
    )
  }

}
