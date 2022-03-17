import { Component, OnInit } from '@angular/core';
import {SearchUserService} from "../../service/search-user/search-user.service";
import {User} from "../../../../../model/user/user.model";
import {SearchUserInterface, UserInterface} from "../../service/search-user/search-user.interface";
import {HttpParams} from "@angular/common/http";

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


  private queryParams:HttpParams = new HttpParams();

  constructor(
    private searchUserService:SearchUserService
  ) { }

  ngOnInit(): void {
    this.resetQueryParams();
    this.getUsers();

  }

  private resetQueryParams():void
  {
    this.queryParams = this.queryParams.append('pageSize',3);
    this.queryParams = this.queryParams.append('currentPage',1);
  }

  private getUsers():void
  {
    this.searchUserService.invoke(this.queryParams).subscribe({
      next:(response:SearchUserInterface)=>{
        this.total = response.total;
        this.pages = response.pages;
        this.currentPage = response.currentPage;
        this.usersToModel(response.users);
      }
    });
  }

  private usersToModel(users:UserInterface[]):void
  {
    this.users = [];
    users.forEach((user)=>{
      let userModel = new User(
        user.id,
        user.email,
        user.role,
        user.name,
        user.surname
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

}
