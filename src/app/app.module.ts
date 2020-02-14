import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdditionalFilterButtonModule } from './modules/AdditionalFilterButton/additional-filter-button.module';
import { DemoGridComponent } from './components/demo-grid/demo-grid.component';
import { DxDataGridModule, DxTreeListModule, DxNumberBoxModule } from 'devextreme-angular';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { AdditionalFilterService } from './modules/AdditionalFilterButton/services/additional-filter.service';
import { ResourceAllocationComponent } from './components/resource-allocation/resource-allocation.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoGridComponent,
    TreeListComponent,
    ResourceAllocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdditionalFilterButtonModule,
    DxDataGridModule,
    DxTreeListModule,
    DxNumberBoxModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
