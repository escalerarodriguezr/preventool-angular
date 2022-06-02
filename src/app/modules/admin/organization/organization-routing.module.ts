import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateOrganizationComponent} from "./component/create-organization/create-organization.component";
import {SearchOrganizationComponent} from "./component/search-organization/search-organization.component";
import {EditUserComponent} from "../user/component/edit-user/edit-user/edit-user.component";
import {EditOrganizationComponent} from "./component/edit-organization/edit-organization.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateOrganizationComponent
      },
      {
        path: 'organizations',
        component: SearchOrganizationComponent
      },
      {
        path: 'edit/:uuid',
        component: EditOrganizationComponent
      },
      {
        path: '*',
        redirectTo: 'create'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
