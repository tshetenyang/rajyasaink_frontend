import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager_routing';





@NgModule({
  declarations: [],
  imports: [
    CommonModule, ManagerRoutingModule, SharedModule
  ]
})
export class ManagerModule { }
