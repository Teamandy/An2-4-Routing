import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { FormsModule } from '@angular/forms';
import { TasksServicesModule } from './tasks-services.module';
import * as fromTasks from './components';

const toArray = obj => Object.keys(obj).map(key => obj[key]);

const components = toArray(fromTasks);

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,

    TasksRoutingModule,

    TasksServicesModule
  ]
})
export class TasksModule { }
