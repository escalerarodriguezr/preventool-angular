import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { UpdateCompanyComponent } from './component/update-company/update-company.component';


@NgModule({
  declarations: [
    UpdateCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
