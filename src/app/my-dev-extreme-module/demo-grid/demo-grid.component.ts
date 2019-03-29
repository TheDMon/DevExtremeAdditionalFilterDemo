import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css']
})
export class DemoGridComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  public additionalFilterDictionary: any[] = [];
  public datasource:any;

  constructor() { }

  ngOnInit() {
    this.loadData();
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
