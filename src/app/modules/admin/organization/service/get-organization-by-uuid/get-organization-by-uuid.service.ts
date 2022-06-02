import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {GetOrganizationByUuidInterface} from "./get-organization-by-uuid.interface";
import {GetUserByUuidInterface} from "../../../user/service/get-user-by-uuid/get-user-by-uuid.interface";

@Injectable({
  providedIn: 'root'
})
export class GetOrganizationByUuidService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(uuid:string):Observable<GetOrganizationByUuidInterface>
  {
    return this.http.get<GetOrganizationByUuidInterface>(
      `${environment.api_url}organization/${uuid}`,
      {
        headers: this.httpBaseService.getBaseHeaders()
      }
    )
  }
}
