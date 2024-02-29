import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ErrorDTO } from 'src/app/model/Error';
import { JwtToken } from 'src/app/model/JwtToken';
import { UserDTO } from 'src/app/model/UserDTO';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDTO: UserDTO = new UserDTO(); 
  exception: boolean = false;
  error:ErrorDTO = new ErrorDTO();
  jwtToken: JwtToken = new JwtToken();
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.exception = false;
  }

  login():void{
    this.loginService.login(this.userDTO).subscribe(
      (res) => {
        this.jwtToken = res;
        this.loginService.saveToken(this.jwtToken.token);
        setTimeout(()=>{
          this.router.navigateByUrl("/customer"),2000})
      },
      (err) => {
        this.exception = true;
        this.error.errorMessage = err.error.message;
        this.error.errorCode = err.error.error_code;
      }
    )
  }

}
