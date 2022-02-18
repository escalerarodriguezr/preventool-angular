import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateCompanyComponent} from "../company/component/update-company/update-company.component";
import {UsersComponent} from "./component/users/users.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: '**',
        redirectTo: 'update'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
