import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {CreateOrganizationService} from "../../service/create-organization/create-organization.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  public createOrganizationForm: FormGroup;

  public nameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;

  constructor(
    private fb:FormBuilder,
    private httpBaseService:HttpBaseService,
    private createOrganizationService:CreateOrganizationService
  ) {

    this.createOrganizationForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      legalDocument:[null],
      address:[null]
    })
  }

  ngOnInit(): void {

    this.createOrganizationForm.get('name')?.statusChanges.subscribe({
      next: (status:FormControlStatus)=>{
        this.nameHasError = status == 'INVALID';
      }
    });

    this.createOrganizationForm.get('email')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.emailRequiredError =  !!this.createOrganizationForm.get('email')?.hasError('required');
        this.emailEmailError = !!this.createOrganizationForm.get('email')?.hasError('email');
      }
    });

  }

  get formValid():boolean
  {
    return this.createOrganizationForm.valid;
  }

  get formDirty():boolean
  {
    return this.createOrganizationForm.dirty
  }

  get emailInvalid():boolean
  {
    return this.emailRequiredError || this.emailEmailError;
  }

  get formCanSubmit():boolean
  {
    return (this.formValid && this.formDirty);
  }

  public submit():void
  {
    if( this.createOrganizationForm.valid ){
      this.httpBaseService.screenLock();
      this.createOrganizationService.invoke(this.createOrganizationForm).subscribe({
        next:(response:{})=>{
          this.httpBaseService.screenUnLock();
          Swal.fire(
            'Organización creado',
            `${ this.createOrganizationForm.get('name')?.value } fue creada correctamente`,
            'success'
          );
        },
        error: (error:HttpErrorResponse) => {
          this.httpBaseService.screenUnLock();
          if( error.status == 400 ){
            if((error.error.class).includes('BadRequestHttpException')){
              Swal.fire('Info', 'Campos inválidos: '+error.error.message, 'info' );
            }
          }else if( error.status == 409 ){
            if((error.error.class).includes('OrganizationAlreadyExistsException')){
              Swal.fire('Info', 'Ya existe una Organización registrada con el email: ' + this.createOrganizationForm.get('email')?.value, 'info'  );
            }else if((error.error.class).includes('ActionUserActionNotAllowedException')){
              Swal.fire('Info', 'No tienes permisos suficientes para realizar esta acción', 'info');
            }else{
              Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
            }
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      })
    }
  }
}
