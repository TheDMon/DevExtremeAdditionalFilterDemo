import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { AdditionalFilterButtonComponent } from './additional-filter-button/additional-filter-button.component';
import { 
  //DevExtremeModule,
  DxDataGridModule,
  DxPopupModule,
  DxListModule
 } from 'devextreme-angular';

@NgModule({
  declarations: [DemoGridComponent, AdditionalFilterButtonComponent],
  imports: [
    CommonModule,
    //DevExtremeModule,
    DxDataGridModule,
    DxPopupModule,
    DxListModule
  ]
})
export class MyDevExtremeModuleModule { }
