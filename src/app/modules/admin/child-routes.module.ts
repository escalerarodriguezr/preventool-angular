import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const childRoutes: Routes = [
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyModule ),
  },

]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
