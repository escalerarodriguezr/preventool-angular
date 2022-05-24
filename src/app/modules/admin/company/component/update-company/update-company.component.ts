import { Component, OnInit } from '@angular/core';
import {GetCompanyService} from "../../service/get-company/get-company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GetCompanyInterface} from "../../service/get-company/get-company-interface";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Company} from "../../../../../model/company/company.model";
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  private company:Company|undefined
  public updateCompanyForm:FormGroup

  public nameHasError:boolean = false;

  constructor(
    private getCompanyService:GetCompanyService,
    private httpBaseService:HttpBaseService,
    private fb:FormBuilder
  )
  {
    this.updateCompanyForm = this.fb.group({
      name:['',Validators.required],
      legalDocument:[''],
      address:['']
    });
  }

  ngOnInit(): void {

    this.httpBaseService.screenLock()
    this.getCompanyService.invoke().subscribe({
      next: (response:GetCompanyInterface)=>{

        this.company = new Company(
          response.id,
          response.uuid,
          response.name,
          response.legalDocument,
          response.address
        );

        this.setCompanyInitValues();
        this.httpBaseService.screenUnLock();
      },
      error: (error:HttpErrorResponse)=>{
        this.httpBaseService.screenUnLock();
        if( error.status == 404 ) {
          Swal.fire('Error', 'Error: '+error.error.message, 'error' );
        }else{
          Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
        }
      }
    });

    this.updateCompanyForm.get('name')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
      this.nameHasError = status == 'INVALID';
    }
    })
  }

  private setCompanyInitValues():void
  {
    const initCompany = {
      name:this.company?.name,
      legalDocument:this.company?.legalDocument,
      address:this.company?.legalDocument
    }
    this.updateCompanyForm.setValue(initCompany)
  }

  get formValid():boolean
  {
    return this.updateCompanyForm.valid;
  }


  public submit():void
  {
    console.log(this.updateCompanyForm.value);
  }

}
