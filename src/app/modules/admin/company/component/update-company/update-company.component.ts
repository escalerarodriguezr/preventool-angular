import { Component, OnInit } from '@angular/core';
import {GetCompanyService} from "../../service/get-company/get-company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GetCompanyInterface} from "../../service/get-company/get-company-interface";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {Company} from "../../../../../model/company/company.model";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {


  private company:Company|undefined

  constructor(
    private getCompanyService:GetCompanyService,
    private httpBaseService:HttpBaseService
  ) {
    console.log("carga");
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

        console.log(this.company);
        this.httpBaseService.screenUnLock();
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
        this.httpBaseService.screenUnLock();
      }
    })
  }

}
