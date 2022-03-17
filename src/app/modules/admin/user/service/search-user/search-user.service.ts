import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {SearchUserInterface} from "./search-user.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  private queryParams:HttpParams = new HttpParams();

  constructor(
    private http:HttpClient,
    private router:Router,
    private httpBaseService:HttpBaseService
  )
  {
    this.queryParams = this.queryParams.append("pageSize",3);
  }

  public invoke():Observable<SearchUserInterface>
  {
    return this.http.get<SearchUserInterface>(
      `${ environment.api_url}user`,
      {
        headers: this.httpBaseService.getBaseHeaders(),
        params: this.queryParams
      }
    );

  }
}
