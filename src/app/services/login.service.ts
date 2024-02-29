import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../model/UserDTO';
import { Observable } from 'rxjs';
import { UriConfig } from '../config/URIconfig';
import { JwtToken } from '../model/JwtToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private TOKEN_KEY = 'jwtToken';

  constructor(private http:HttpClient, private uriConfig:UriConfig) { }

  public login(userDTO:UserDTO):Observable<JwtToken>{
    return this.http.post<JwtToken>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.authenticate}` + "/auth", userDTO);
  }

  public validateToken(jwtToken:JwtToken):Observable<boolean>{
    return this.http.post<boolean>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.authenticate}` + "/validate-token", jwtToken);
  }

  public saveToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}
