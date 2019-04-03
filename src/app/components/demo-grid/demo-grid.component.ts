import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AdditionalFilterButtonComponent } from '../../modules/AdditionalFilterButton/components/additional-filter-button/additional-filter-button.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css']
})
export class DemoGridComponent implements OnInit {
  // get the instance of the datagrid which we want to bind with the additional filter
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  // get the instance of the additional filter, if we want to programmitically set filter 
  @ViewChild('myFilter') addlFtr: AdditionalFilterButtonComponent;

  public datasource:any;


  constructor(private _dataService:DataService) { }

  ngOnInit() {
     this.datasource = this._dataService.getData();
     //console.log('printing the addl filter component', this.addlFtr);

    // this is how initial filter value can be set
    this.addlFtr.applyInitialFilter(['Mike']);  
  }

  clearFirstName(): void{
    this.addlFtr.clearFilter();
  }

}
