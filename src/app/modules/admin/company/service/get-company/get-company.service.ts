import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {GetCompanyInterface} from "./get-company-interface";

@Injectable({
  providedIn: 'root'
})
export class GetCompanyService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService

  ) { }

  public invoke():Observable<any>
  {
    return this.http.get<GetCompanyInterface>(
      `${environment.api_url}company`,{
        headers: this.httpBaseService.getBaseHeaders()
      }
    );
  }
}
