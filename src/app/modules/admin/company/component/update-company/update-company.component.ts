import { Component, OnInit } from '@angular/core';
import {GetCompanyService} from "../../service/get-company/get-company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GetCompanyInterface} from "../../service/get-company/get-company-interface";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {


  private company:any

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
        this.httpBaseService.screenUnLock();
        console.log(response.name);
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
        this.httpBaseService.screenUnLock();
      }
    })
  }

}
