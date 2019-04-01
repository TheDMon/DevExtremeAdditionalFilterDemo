import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AdditionalFilterButtonComponent } from '../../modules/AddtionalFilterButton/components/additional-filter-button/additional-filter-button.component';
import { AdditionalFilterService } from 'src/app/modules/AddtionalFilterButton/services/additional-filter.service';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css'],
  providers: [ AdditionalFilterService ] /* We need to set provider at component level as we want the service create separate instance for each component */
})
export class DemoGridComponent implements OnInit {
  // get the instance of the datagrid which we want to bind with the additional filter
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  // get the instance of the additional filter, if we want to programmitically set filter 
  @ViewChild('myFilter') addlFtr: AdditionalFilterButtonComponent;

  public datasource:any;


  constructor() { }

  ngOnInit() {
    this.loadData();
    console.log('printing the addl filter component', this.addlFtr);

    // this is how initial filter value can be set
    this.addlFtr.applyInitialFilter(['Mike']);  
  }

  clearFirstName(): void{
    this.addlFtr.clearFilter();
  }

  loadData(): void{
    this.datasource = [
      { 
        ID: 1,
        FirstName: 'Mike',
        LastName: 'Zinda',
        Role: 'Architect',
        Experience: '15 years'
      },
      { 
        ID: 2,
        FirstName: 'Mike',
        LastName: 'Wiz',
        Role: 'DBA',
        Experience: '23 years'
      },
      { 
        ID: 3,
        FirstName: 'Mike',
        LastName: 'Griff',
        Role: 'Developer',
        Experience: '10 years'
      },
      { 
        ID: 4,
        FirstName: 'Stacey',
        LastName: 'Barry',
        Role: 'Business Analist',
        Experience: '25 years'
      },
      { 
        ID: 5,
        FirstName: 'Doug',
        LastName: 'Weigler',
        Role: 'Business Analist',
        Experience: '18 years'
      },
      { 
        ID: 6,
        FirstName: 'Amiri',
        LastName: 'Settles',
        Role: 'Business Analist',
        Experience: '16 years'
      }
    ];
  }

}
