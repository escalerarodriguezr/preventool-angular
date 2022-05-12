import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(userUuid:string, updateUserForm:FormGroup):Observable<{}>
  {
    return this.http.put(
      `${ environment.api_url}user/${userUuid}`,
      updateUserForm,
      this.httpBaseService.headers
    );
  }
}
