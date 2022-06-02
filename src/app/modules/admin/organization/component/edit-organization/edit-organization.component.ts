import { Component, OnInit } from '@angular/core';
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {GetUserByUuidService} from "../../../user/service/get-user-by-uuid/get-user-by-uuid.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {GetOrganizationByUuidService} from "../../service/get-organization-by-uuid/get-organization-by-uuid.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {
  GetOrganizationByUuidInterface
} from "../../service/get-organization-by-uuid/get-organization-by-uuid.interface";

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpBaseService:HttpBaseService,
    private service:GetOrganizationByUuidService
  ) { }

  ngOnInit(): void {
    this.httpBaseService.screenLock()
    this.activatedRoute.params
      .pipe(
        switchMap( ({ uuid }) => this.service.invoke( uuid )  ),
      )
      .subscribe({
        next:(getOrganizationByUuidResponse:GetOrganizationByUuidInterface) =>{
          console.log(getOrganizationByUuidResponse.address);
          this.httpBaseService.screenUnLock();
        },
        error: (error:HttpErrorResponse) => {
          this.httpBaseService.screenUnLock();
          if( error.status == 404 ) {
            Swal.fire('Error', 'Error: '+error.error.message, 'error' );
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      });
  }

}
