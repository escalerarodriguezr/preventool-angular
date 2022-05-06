import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class UserModule { }
