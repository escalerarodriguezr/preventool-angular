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

  private orderByNameDirection:string = 'DESC';
  private orderByEmailDirection:string = 'DESC';
  private orderByCreatedOnDirection:string = 'DESC';

  public filterByEmail:string|null = null;
  public filterByIsActive:boolean|string = 'all';

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

  public getPagesCollection():number[]
  {
    let pagesCollection:any[] = [];
    for(let j=-2;j<=2;j++){
      let i = this.currentPage+j;
      if(i>=1 && i<=this.pages){
        pagesCollection.push(i);
      }
    }
    return pagesCollection;
  }

  public showLastPageButton():boolean{
    return this.currentPage < this.pages;
  }

  public showPagination():boolean{
    return this.pages > 1;
  }

  public changePage(selectedPage:number):void
  {
    this.queryParams = this.queryParams.append('currentPage',selectedPage);
    this.getOrganizations();
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

  public orderByName():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByNameDirection = (this.orderByNameDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','name');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByNameDirection);
    this.getOrganizations();
  }

  public orderByEmail():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByEmailDirection = (this.orderByEmailDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','email');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByEmailDirection);
    this.getOrganizations();
  }

  public orderByCreatedOn():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByCreatedOnDirection = (this.orderByCreatedOnDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','createdOn');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByCreatedOnDirection);
    this.getOrganizations();
  }


  public applyFilters():void
  {
    this.resetQueryParams();
    if( this.filterByEmail !== null && this.filterByEmail.length > 0 ){
      this.queryParams = this.queryParams.append('filterByEmail',this.filterByEmail.trim());
    }
    if( this.filterByIsActive !== 'all' ){
      this.queryParams = this.queryParams.append('filterByIsActive',this.filterByIsActive);
    }
    this.getOrganizations();
  }
}
