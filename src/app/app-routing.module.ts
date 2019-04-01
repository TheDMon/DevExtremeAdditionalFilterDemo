import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoGridComponent } from './components/demo-grid/demo-grid.component';

const routes: Routes = [
  { path: '', component: DemoGridComponent },
  { path: 'demogrid', component: DemoGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
