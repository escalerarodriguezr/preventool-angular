import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { CreateOrganizationComponent } from './component/create-organization/create-organization.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchOrganizationComponent } from './component/search-organization/search-organization.component';


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    SearchOrganizationComponent
  ],
    imports: [
        CommonModule,
        OrganizationRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class OrganizationModule { }
