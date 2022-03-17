import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {SearchUserInterface} from "./search-user.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private httpBaseService:HttpBaseService
  )
  { }

  public invoke():Observable<SearchUserInterface>
  {
    return this.http.get<SearchUserInterface>(
      `${ environment.api_url}user`,
      this.httpBaseService.headers
    );

  }
}
