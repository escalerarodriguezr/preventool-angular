import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import {CompanyModule} from "./company/company.module";
import {UserModule} from "./user/user.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {BreadcrumbComponent} from "./shared/component/breadcrumb/breadcrumb.component";
import {UploadImageComponent} from "./shared/component/upload-image/upload-image.component";


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    UploadImageComponent
  ],
  exports: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardModule,
    CompanyModule,
    UserModule
  ]
})
export class AdminModule { }
