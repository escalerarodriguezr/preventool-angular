import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/admin/guard/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'admin',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminModule ),
  },

  {
    path: '**',
    loadChildren: () => import('./modules/shared/shared.module').then( m => m.SharedModule ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
