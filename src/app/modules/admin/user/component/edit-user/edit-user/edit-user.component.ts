import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {GetUserByUuidService} from "../../../service/get-user-by-uuid/get-user-by-uuid.service";
import {GetUserByUuidInterface} from "../../../service/get-user-by-uuid/get-user-by-uuid.interface";
import {User} from "../../../../../../model/user/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private user: User | undefined;

  constructor(
    private activatedRoute:ActivatedRoute,
    private service:GetUserByUuidService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ uuid }) => this.service.invoke( uuid )  ),
      )
      .subscribe(
        {
          next:(getUserByUuidResponse:GetUserByUuidInterface)=>{
            this.user = new User(
              getUserByUuidResponse.id,
              getUserByUuidResponse.uuid,
              getUserByUuidResponse.email,
              getUserByUuidResponse.role,
              getUserByUuidResponse.name,
              getUserByUuidResponse.lastName,
            )
            console.dir(this.user);

          },
          error: (error:HttpErrorResponse) => {
            if( error.status == 404 ) {
              console.log(error);
              Swal.fire('Error', 'Error: '+error.error.message, 'error' );
            }else{
              Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
            }
          }
        }
      );
  }

}
