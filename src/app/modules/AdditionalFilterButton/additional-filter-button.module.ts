import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalFilterButtonComponent } from './components/additional-filter-button/additional-filter-button.component';
import { 
  DxPopupModule,
  DxListModule
 } from 'devextreme-angular';
import { AdditionalFilterService } from './services/additional-filter.service';

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
  ],
  providers: [
    AdditionalFilterService
  ]
})
export class AdditionalFilterButtonModule { }
