import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadUserAvatarService {

  constructor(
    private http:HttpClient,
    private httpBaseService:HttpBaseService
  ) { }

  public invoke(userUuid:string, avatar:File):Observable<{}>
  {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.http.post(
      `${ environment.api_url}user/${userUuid}/avatar`,
      formData,
      this.httpBaseService.headers
    );
  }
}
