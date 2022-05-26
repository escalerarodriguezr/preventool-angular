import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../../auth/login/login.component";
import {UpdateCompanyComponent} from "./component/update-company/update-company.component";
import {AuthGuard} from "../guard/auth.guard";
import {RootGuard} from "../guard/root.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit',
        canActivate: [ RootGuard ],
        component: UpdateCompanyComponent
      },
      {
        path: '**',
        redirectTo: 'edit'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
