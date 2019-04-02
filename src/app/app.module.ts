import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdditionalFilterButtonModule } from './modules/AddtionalFilterButton/additional-filter-button.module';
import { DemoGridComponent } from './components/demo-grid/demo-grid.component';
import { DxDataGridModule, DxTreeListModule} from 'devextreme-angular';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { AdditionalFilterService } from './modules/AddtionalFilterButton/services/additional-filter.service';


@NgModule({
  declarations: [
    AppComponent,
    DemoGridComponent,
    TreeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdditionalFilterButtonModule,
    DxDataGridModule,
    DxTreeListModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
