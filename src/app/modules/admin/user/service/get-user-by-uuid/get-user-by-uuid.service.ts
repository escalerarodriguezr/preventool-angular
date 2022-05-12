import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {GetUserByUuidInterface} from "./get-user-by-uuid.interface";

@Injectable({
  providedIn: 'root'
})
export class GetUserByUuidService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }


  public invoke(uuid:string):Observable<GetUserByUuidInterface>
  {
    return this.http.get<GetUserByUuidInterface>(
      `${environment.api_url}user/`+uuid,
      {
        headers: this.httpBaseService.getBaseHeaders()
      }
    );
  }
}
