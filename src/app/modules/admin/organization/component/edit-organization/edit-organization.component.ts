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
import {Organization} from "../../../../../model/organization/organization.model";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  private organization:Organization|undefined
  public updateOrganizationForm: FormGroup;

  public nameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpBaseService:HttpBaseService,
    private service:GetOrganizationByUuidService,
    private fb:FormBuilder
  ) {
    this.updateOrganizationForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      legalDocument:[null],
      address:[null]
    })
  }

  ngOnInit(): void {
    this.httpBaseService.screenLock()
    this.activatedRoute.params
      .pipe(
        switchMap( ({ uuid }) => this.service.invoke( uuid )  ),
      )
      .subscribe({
        next:(getOrganizationByUuidResponse:GetOrganizationByUuidInterface) =>{
          console.log(getOrganizationByUuidResponse.address);
          this.organization = new Organization(
            getOrganizationByUuidResponse.id,
            getOrganizationByUuidResponse.uuid,
            getOrganizationByUuidResponse.name,
            getOrganizationByUuidResponse.email,
            getOrganizationByUuidResponse.isActive,
            getOrganizationByUuidResponse.createdOn,
            getOrganizationByUuidResponse.legalDocument,
            getOrganizationByUuidResponse.address
          );
          this.setOrganizationInitValues();
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

    this.updateOrganizationForm.get('name')?.statusChanges.subscribe({
      next: (status:FormControlStatus)=>{
        this.nameHasError = status == 'INVALID';
      }
    });

    this.updateOrganizationForm.get('email')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.emailRequiredError =  !!this.updateOrganizationForm.get('email')?.hasError('required');
        this.emailEmailError = !!this.updateOrganizationForm.get('email')?.hasError('email');
      }
    });
  }

  private setOrganizationInitValues():void
  {
    const initOrganization = {
      name:this.organization?.name,
      email:this.organization?.email,
      legalDocument:this.organization?.legalDocument,
      address:this.organization?.address
    }
    this.updateOrganizationForm.setValue(initOrganization);
  }

  get formValid():boolean
  {
    return this.updateOrganizationForm.valid;
  }

  get formDirty():boolean
  {
    return this.updateOrganizationForm.dirty
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
    //waiting for backend updateOrganizationService
    console.log(this.updateOrganizationForm.value);
  }

}
