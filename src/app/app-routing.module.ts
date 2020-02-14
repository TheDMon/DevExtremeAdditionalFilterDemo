import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoGridComponent } from './components/demo-grid/demo-grid.component';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { ResourceAllocationComponent } from './components/resource-allocation/resource-allocation.component';

const routes: Routes = [
  { path: '', component: DemoGridComponent },
  { path: 'demogrid', component: DemoGridComponent },
  { path: 'treelist', component:TreeListComponent },
  { path: 'resource-allocation', component:ResourceAllocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
