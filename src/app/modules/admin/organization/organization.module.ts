import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { CreateOrganizationComponent } from './component/create-organization/create-organization.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateOrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrganizationModule { }
