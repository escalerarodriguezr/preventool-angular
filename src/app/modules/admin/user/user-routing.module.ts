import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateCompanyComponent} from "../company/component/update-company/update-company.component";
import {UsersComponent} from "./component/users/users.component";
import {CreateUserComponent} from "./component/create-user/create-user.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
