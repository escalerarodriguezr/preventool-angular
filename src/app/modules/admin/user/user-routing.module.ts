import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./component/users/users.component";
import {CreateUserComponent} from "./component/create-user/create-user.component";
import {EditUserComponent} from "./component/edit-user/edit-user/edit-user.component";

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
        path: 'edit/:uuid',
        component: EditUserComponent
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
