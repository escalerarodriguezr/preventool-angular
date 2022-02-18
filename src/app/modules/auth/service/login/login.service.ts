import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginResponseInterface} from "./interface/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  )
  {

  }

  public login(email:string, password:string): Observable<loginResponseInterface>
  {
    console.log(environment.auth_url);
    return this.http.post<loginResponseInterface>(
      environment.auth_url,
      {
        username: email,
        password: password
        }
      );


  }
}
