import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const childRoutes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyModule ),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule ),
  },
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then( m => m.OrganizationModule ),
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  },

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
