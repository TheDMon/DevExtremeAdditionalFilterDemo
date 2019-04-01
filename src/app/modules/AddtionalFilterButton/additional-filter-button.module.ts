import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalFilterButtonComponent } from './components/additional-filter-button/additional-filter-button.component';
import { 
  DxPopupModule,
  DxListModule
 } from 'devextreme-angular';

@NgModule({
  declarations: [ 
    AdditionalFilterButtonComponent 
  ],
  imports: [
    CommonModule,
    DxPopupModule,
    DxListModule
  ],
  exports: [
    AdditionalFilterButtonComponent
  ]
})
export class AdditionalFilterButtonModule { }
