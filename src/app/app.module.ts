import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyDevExtremeModuleModule } from './my-dev-extreme-module/my-dev-extreme-module.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyDevExtremeModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
