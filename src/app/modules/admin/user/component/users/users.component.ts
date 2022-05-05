import { Component, OnInit } from '@angular/core';
import {SearchUserService} from "../../service/search-user/search-user.service";
import {User} from "../../../../../model/user/user.model";
import {SearchUserInterface, UserInterface} from "../../service/search-user/search-user.interface";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {HttpBaseService} from "../../../shared/service/http-base/http-base.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:User[] = [];
  public total:number = 0;
  public pages:number = 0;
  public currentPage:number = 0;

  private orderByEmailDirection:string = 'DESC';
  private orderByNameDirection:string = 'DESC';
  private orderByRoleDirection:string = 'DESC';

  private queryParams:HttpParams = new HttpParams();

  constructor(
    private httBaseService:HttpBaseService,
    private searchUserService:SearchUserService
  ) { }

  ngOnInit(): void {
    this.resetQueryParams();
    this.getUsers();

  }

  private resetQueryParams():void
  {
    this.queryParams = this.queryParams.append('pageSize',10);
    this.queryParams = this.queryParams.append('currentPage',1);
    this.orderByRole();
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
        user.lastName
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

  public changePage(selectedPage:number):void
  {
    this.queryParams = this.queryParams.append('currentPage',selectedPage);
    this.getUsers();
  }

  public orderByEmail():void
  {
    this.orderByEmailDirection = (this.orderByEmailDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.append('orderBy','email');
    this.queryParams = this.queryParams.append('orderDirection',this.orderByEmailDirection);
    this.getUsers();
  }

  public orderByName():void
  {
    this.orderByNameDirection = (this.orderByNameDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.append('orderBy','name');
    this.queryParams = this.queryParams.append('orderDirection',this.orderByNameDirection);
    this.getUsers();
  }

  public orderByRole():void
  {
    this.orderByRoleDirection = (this.orderByRoleDirection == 'DESC') ? 'ASC' : 'DESC';
    this.queryParams = this.queryParams.append('orderBy','role');
    this.queryParams = this.queryParams.append('orderDirection',this.orderByRoleDirection);
    this.getUsers();
  }

}
