import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';

import { UserComponent } from './components';

@NgModule({
  declarations: [...UsersRoutingModule.components, UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersServicesModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
