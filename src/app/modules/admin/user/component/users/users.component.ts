import { Component, OnInit } from '@angular/core';
import {SearchUserService} from "../../service/search-user/search-user.service";
import {User} from "../../../../../model/user/user.model";
import {SearchUserInterface, UserInterface} from "../../service/search-user/search-user.interface";

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

  constructor(
    private searchUserService:SearchUserService
  ) { }

  ngOnInit(): void {
    this.searchUserService.invoke().subscribe({
      next:(response:SearchUserInterface)=>{
        console.log(response);
        this.total = response.total;
        this.pages = response.pages;
        this.currentPage = response.currentPage;
        console.log(this.currentPage);
        this.usersToModel(response.users);
      }
    });
  }

  private usersToModel(users:UserInterface[]):void
  {
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

  public showNextIcon():boolean{
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

}
