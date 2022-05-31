import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {SearchOrganizationInterface} from "./search-organization.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchOrganizationService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(queryParams:HttpParams):Observable<SearchOrganizationInterface>
  {
    return this.http.get<SearchOrganizationInterface>(
      `${environment.api_url}organization`,
      {
        headers: this.httpBaseService.getBaseHeaders(),
        params: queryParams
      }
    )
  }
}
