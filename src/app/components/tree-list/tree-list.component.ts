import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DxTreeListComponent } from 'devextreme-angular';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  @ViewChild('demoTreeList') treelist: DxTreeListComponent;
  public dataSource: any;

  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this.dataSource = this._dataService.getData();

    this.dataSource.forEach(element => {
      element.ParentID = 0;
    });
  }

}
