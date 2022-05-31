import { Component, OnInit } from '@angular/core';
import {Organization} from "../../../../../model/organization/organization.model";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import {SearchOrganizationService} from "../../service/search-organization/search-organization.service";
import {
  OrganizationInterface,
  SearchOrganizationInterface
} from "../../service/search-organization/search-organization.interface";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.css']
})
export class SearchOrganizationComponent implements OnInit {

  public organizations:Organization[] = [];
  public total:number = 0;
  public pages:number = 0;
  public currentPage:number = 0;

  private queryParams:HttpParams = new HttpParams();

  constructor(
    private httpBaseService:HttpBaseService,
    private searchOrganizationService:SearchOrganizationService
  )
  {
    this.resetQueryParams()
    this.getOrganizations();
  }

  ngOnInit(): void {
  }

  private resetQueryParams():void
  {
    this.queryParams = new HttpParams();
    this.queryParams = this.queryParams.append('pageSize',10);
    this.queryParams = this.queryParams.append('currentPage',1);
  }

  private getOrganizations():void
  {
    this.httpBaseService.screenLock();
    this.searchOrganizationService.invoke(this.queryParams).subscribe({
      next:(response:SearchOrganizationInterface)=>{
        this.total = response.total;
        this.pages = response.pages;
        this.currentPage = response.currentPage;
        this.organizationsToModel(response.items);
        this.httpBaseService.screenUnLock();
      },
      error: (error:HttpErrorResponse) => {
        this.httpBaseService.screenUnLock();
        Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
      }
    })
  }

  private organizationsToModel(organizations:OrganizationInterface[]):void
  {
    this.organizations = [];
    organizations.forEach((organization:OrganizationInterface)=>{
      let organizationModel:Organization;
      organizationModel = new Organization(
        organization.id,
        organization.uuid,
        organization.name,
        organization.email,
        organization.isActive,
        organization.createdOn,
        organization.legalDocument,
        organization.address
      );
      this.organizations.push(organizationModel);
    })
  }


}
