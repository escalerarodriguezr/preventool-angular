import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import {CompanyModule} from "./company/company.module";
import {UserModule} from "./user/user.module";


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CompanyModule,
    UserModule
  ]
})
export class AdminModule { }
