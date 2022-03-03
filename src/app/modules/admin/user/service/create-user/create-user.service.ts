import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private httpBaseService:HttpBaseService
  )
  {

  }

  public invoke(createUser:FormGroup):Observable<any>
  {
    return this.http.post(
      `${ environment.api_url}user`,
      createUser,
      this.httpBaseService.headers
    );
  }
}
