import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizationService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(createOrganizationForm:FormGroup):Observable<{}>
  {
    return this.http.post<{}>(
      `${environment.api_url}organization`,
      createOrganizationForm.value,
      this.httpBaseService.headers
    )
  }
}
