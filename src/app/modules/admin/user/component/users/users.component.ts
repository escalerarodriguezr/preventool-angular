import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SearchUserService} from "../../service/search-user/search-user.service";
import {User} from "../../../../../model/user/user.model";
import {SearchUserInterface, UserInterface} from "../../service/search-user/search-user.interface";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import Swal from "sweetalert2";
import {SessionService} from "../../../shared/service/session/session.service";

//declare global function
// @ts-ignore
declare function customInitDatePicker();

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,AfterViewInit {

  public users:User[] = [];
  public total:number = 0;
  public pages:number = 0;
  public currentPage:number = 0;

  private orderByEmailDirection:string = 'DESC';
  private orderByNameDirection:string = 'DESC';
  private orderByRoleDirection:string = 'DESC';
  private orderByCreatedOnDirection:string = 'DESC';

  private queryParams:HttpParams = new HttpParams();

  public filterByEmail:string|null = null;
  public filterByIsActive:boolean|string = 'all';
  public filterByCreatedOnFrom:string|null = null;
  public filterByCreatedOnTo:string|null = null;

  constructor(
    private httBaseService:HttpBaseService,
    private searchUserService:SearchUserService,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.resetQueryParams();
    this.getUsers();
  }

  ngAfterViewInit():void
  {
    customInitDatePicker();
  }

  private resetQueryParams():void
  {
    this.queryParams = new HttpParams();
    this.queryParams = this.queryParams.append('pageSize',10);
    this.queryParams = this.queryParams.append('currentPage',1);
  }

  private resetOrderParams():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.queryParams = this.queryParams.delete('orderBy')
  }

  private resetFilters():void
  {
    this.filterByEmail = null;
    this.filterByIsActive = 'all';
    this.filterByCreatedOnFrom = null;
    this.filterByCreatedOnTo = null;
  }

  private getUsers():void
  {
    this.httBaseService.screenLock();
    this.searchUserService.invoke(this.queryParams).subscribe({
      next:(response:SearchUserInterface)=>{
        this.total = response.total;
        this.pages = response.pages;
        this.currentPage = response.currentPage;
        this.usersToModel(response.items);
        this.httBaseService.screenUnLock();
      },
      error: (error:HttpErrorResponse) => {
        this.httBaseService.screenUnLock();
          Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
      }
    });
  }

  private usersToModel(users:UserInterface[]):void
  {
    this.users = [];
    users.forEach((user)=>{
      let userModel = new User(
        user.id,
        user.uuid,
        user.email,
        user.role,
        user.name,
        user.lastName,
        null,
        user.isActive,
        user.createdOn
      )
      this.users.push(userModel);
    })
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
    if(this.currentPage<this.pages){
      return true;
    }
    return false;
  }

  public showPagination():boolean{
    if(this.pages>1){
      return true
    }
    return false;
  }

  public authUserCanEditUser(user:User):boolean
  {
    if( user.role == 'ROLE_ROOT' && (user.userUuid != this.sessionService.authUser?.userUuid) ){
      return false;
    }

    if( user.userUuid == this.sessionService.authUser?.userUuid ){
      return true;
    }
    return this.sessionService.authUser?.role == 'ROLE_ROOT'
  }

  public changePage(selectedPage:number):void
  {
    this.queryParams = this.queryParams.append('currentPage',selectedPage);
    this.getUsers();
  }

  public orderByEmail():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByEmailDirection = (this.orderByEmailDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','email');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByEmailDirection);
    this.getUsers();
  }

  public orderByName():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByNameDirection = (this.orderByNameDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','name');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByNameDirection);
    this.getUsers();
  }

  public orderByRole():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByRoleDirection = (this.orderByRoleDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','role');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByRoleDirection);
    this.getUsers();
  }

  public orderByCreatedOn():void
  {
    this.queryParams = this.queryParams.set('currentPage',1);
    this.orderByCreatedOnDirection = (this.orderByCreatedOnDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.set('orderBy','createdOn');
    this.queryParams = this.queryParams.set('orderDirection',this.orderByCreatedOnDirection);
    this.getUsers();
  }

  private static transformDatePicker(datePicker:string, separator:string = '/'):Date|null
  {
    const date = datePicker.split(separator);
    if( date.length != 3 ){
      return null;
    }
    return new Date(date[1] +separator + date[0] + separator +date[2]);
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

    if( this.filterByCreatedOnFrom !== null ){
      let fromCreatedOn = UsersComponent.transformDatePicker(this.filterByCreatedOnFrom);
      if(fromCreatedOn != null){
        fromCreatedOn.setDate(fromCreatedOn.getDate()-1);
        this.queryParams = this.queryParams.append('filterByCreatedOnFrom',fromCreatedOn.toISOString());
      }
    }

    if( this.filterByCreatedOnTo !== null ){
      let toCreatedOn = UsersComponent.transformDatePicker(this.filterByCreatedOnTo);
      if( toCreatedOn != null ){
        toCreatedOn.setDate(toCreatedOn.getDate()+1);
        this.queryParams = this.queryParams.append('filterByCreatedOnTo',toCreatedOn.toISOString());
      }
    }

    this.getUsers();
  }

}
