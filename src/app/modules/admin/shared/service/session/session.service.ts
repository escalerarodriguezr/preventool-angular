import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {SessionInterface} from "./session.interface";
import {AuthUser} from "../../../../../model/user/authUser.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public authUser:AuthUser|null;

  constructor(
    private http:HttpClient,
    private router:Router

  )
  {
    this.authUser = null;

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': 'Bearer '+this.token
      }
    }
  }

  public getSession():Observable<boolean>
  {
    return this.http.get(`${ environment.api_url}session`, this.headers)
      .pipe(
        map( res => {
          const session = res as SessionInterface;
          this.authUser = new AuthUser(
            session.userId,
            session.email,
            session.role,
            session.name,
            session.surname
          );
          localStorage.setItem('token', session.token );
          return true;
        }),
        catchError( error => {
          return of(false);
        } )
    );
  }

  public logOut():void
  {
    localStorage.removeItem('token');
    this.authUser = null;
    this.router.navigateByUrl('auth');
  }
}
