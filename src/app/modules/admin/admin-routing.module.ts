import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../auth/login/login.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
