import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as layout from './components';

const toArray = obj => Object.keys(obj).map(key => obj[key]);

const components = toArray(layout);

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LayoutModule { }
