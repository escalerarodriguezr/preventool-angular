import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {GetUserByUuidService} from "../../../service/get-user-by-uuid/get-user-by-uuid.service";
import {GetUserByUuidInterface} from "../../../service/get-user-by-uuid/get-user-by-uuid.interface";
import {User} from "../../../../../../model/user/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {HttpBaseService} from "../../../../shared/service/http-base/http-base.service";
import {UpdateUserService} from "../../../service/update-user/update-user.service";
import {UploadUserAvatarService} from "../../../service/upload-user-avatar/upload-user-avatar.service";
import {UploadImageService} from "../../../../shared/service/upload-image/upload-image.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private user: User | undefined;
  public updateUserForm:FormGroup;

  public nameHasError:boolean = false;
  public lastNameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;


  constructor(
    private activatedRoute:ActivatedRoute,
    private service:GetUserByUuidService,
    private fb:FormBuilder,
    private httpBaseService:HttpBaseService,
    private updateUserService:UpdateUserService,
    public uploadImageService:UploadImageService,
    private uploadUserAvatarService:UploadUserAvatarService
  ) {

    this.updateUserForm = this.fb.group({
      name:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required],
      isActive:['',Validators.required],

    });

  }

  ngOnInit(): void {
    this.httpBaseService.screenLock();
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
              getUserByUuidResponse.avatar,
              getUserByUuidResponse.isActive,
              getUserByUuidResponse.createdOn
            );

            this.setUserInitValues();
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
        }
      );

    this.updateUserForm.get('name')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{

      }
    });
    this.updateUserForm.get('lastName')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.lastNameHasError = status == 'INVALID';
      }
    });
    this.updateUserForm.get('email')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.emailRequiredError =  this.updateUserForm.get('email')?.hasError('required') ? true : false;
        this.emailEmailError = this.updateUserForm.get('email')?.hasError('email') ? true : false;
      }
    });
  }

  get formValid():boolean
  {
    return this.updateUserForm.valid;
  }

  public getUser():User
  {
    return <User>this.user;
  }

  private setUserInitValues():void
  {
    const initUser = {
      name:this.user?.name,
      lastName:this.user?.lastName,
      email:this.user?.email,
      role:this.user?.role,
      isActive:this.user?.isActive
    }
    this.updateUserForm.setValue(initUser);
  }


  public submit()
  {
    if(!this.updateUserForm.invalid){
      this.updateUserService.invoke(this.user?.userUuid!,this.updateUserForm.value).subscribe({
        next:(response:{}) => {
          Swal.fire(
            'Usuario modificado',
            `${ this.updateUserForm.get('email')?.value } fue modificado correctamente`,
            'success'
          );
        },
        error: (error:HttpErrorResponse) => {
          if( error.status == 400 ){
            if((error.error.class).includes('BadRequestHttpException')){
              Swal.fire('Info', 'Campos inválidos: '+error.error.message, 'info' );
            }
          }else if( error.status == 409 ){
            if((error.error.class).includes('ActionUserActionNotAllowedException')){
              Swal.fire('Info', 'No tienes permisos suficientes para realizar esta acción', 'info');
            }else{
              Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
            }
          }else if( error.status == 404 ){
            if((error.error.class).includes('UserNotFoundException')){
              Swal.fire('Info', 'El usuario que intentas modificar no existe', 'info');
            }else{
              Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
            }
          } else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      });
    }
  }

  public showChangeAvatarModal():void{
    this.uploadImageService.showModal();
  }

  public uploadAvatar():void
  {
    this.uploadUserAvatarService.invoke(this.user?.userUuid!, this.uploadImageService.newFileFile!).subscribe({
      next:response=>{
        Swal.fire(
          'Avatar modificado',
          `El avatar se ha modificado correctamente`,
          'success'
        );
      },
      error: (error:HttpErrorResponse) => {
        if( error.status == 400 ){
          if((error.error.class).includes('BadRequestHttpException')){
            Swal.fire('Info', 'Campos inválidos: '+error.error.message, 'info' );
          }
        }else if( error.status == 409 ){
          if((error.error.class).includes('ActionUserActionNotAllowedException')){
            Swal.fire('Info', 'No tienes permisos suficientes para realizar esta acción', 'info');
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
          }
        }else if( error.status == 404 ){
          if((error.error.class).includes('UserNotFoundException')){
            Swal.fire('Info', 'El usuario que intentas modificar no existe', 'info');
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
          }
        } else{
          Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
        }
      }
    });
  }
}
