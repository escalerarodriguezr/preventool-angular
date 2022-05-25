import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UpdateCompanyService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(updateCompanyForm:FormGroup):Observable<{}>
  {
    return this.http.put(
      `${environment.api_url}company`,
      updateCompanyForm.value,
      this.httpBaseService.headers
    )
  }
}
