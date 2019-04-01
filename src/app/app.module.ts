import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdditionalFilterButtonModule } from './modules/AddtionalFilterButton/additional-filter-button.module';
import { DemoGridComponent } from './components/demo-grid/demo-grid.component';
import { DxDataGridModule} from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    DemoGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdditionalFilterButtonModule,
    DxDataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
