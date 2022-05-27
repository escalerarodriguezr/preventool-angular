import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateOrganizationComponent} from "./component/create-organization/create-organization.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateOrganizationComponent
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
