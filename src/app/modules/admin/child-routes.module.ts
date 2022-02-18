import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const childRoutes: Routes = [

  {
    path: '',
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
    path: '**',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
  },

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
