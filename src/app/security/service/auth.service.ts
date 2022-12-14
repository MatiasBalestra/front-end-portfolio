import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../Entity/jwt-dto';
import { LoginUsuario } from '../Entity/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //authUrl = environment.apiAuthUrl;
  authUrl = "https://balestra-matias.herokuapp.com/auth/";
  //authUrl = "http://localhost:8080/auth/";

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authUrl + 'login', loginUsuario);
    
  }
}
