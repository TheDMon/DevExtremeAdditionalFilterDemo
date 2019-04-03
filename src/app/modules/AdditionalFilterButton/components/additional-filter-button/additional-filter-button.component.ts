import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import { AdditionalFilterService } from '../../services/additional-filter.service';
import * as $ from 'jquery';
import { AdditionalFilter } from '../../models/additional-filter';

@Component({
    selector: 'additional-filter-button',
    templateUrl: './additional-filter-button.component.html',
    styleUrls: ['./additional-filter-button.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdditionalFilterButtonComponent implements OnInit, OnDestroy {
    public IsVisible: boolean = false;
    public MenuPosition: any;

    @Input() AdditionalFilterDataField: string;
    @Input() DataControl: DxDataGridComponent | DxTreeListComponent; // earlier variable name was DataGrid
    @Input() IsDataMultiValued: boolean = false;
    @Input() MultiValueDelimeter: string = ",";
    @Output() onOKButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFilterStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    public filterButtonDivId: string;
    public dataControlId: string;
    public selectedItemKeys: any[] = [];
    public additionalFilterDataSource: any[];
    public applyFilterButtonOptions: any;
    public cancelButtonOptions: any;
    public filterExprValue: any[] = [];

    constructor(
        private _additionalFilterService: AdditionalFilterService,
        private _changeDetector: ChangeDetectorRef
        ) {
        this.applyFilterButtonOptions = {
            text: "OK",
            onClick: (e: any) => {
                this.applyFilter();
                this.IsVisible = false;
                this.onOKButtonClicked.emit(this.filterExprValue);
            }
        };

        this.cancelButtonOptions = {
            text: "Cancel",
            onClick: (e: any) => {
                this.IsVisible = false;
            }
        };
    }

    applyFilter(): void {
        if (this.IsDataMultiValued) {
            this.filterExprValue = [];
            if (this.selectedItemKeys.length > 0 
                && (this.additionalFilterDataSource == undefined || this.selectedItemKeys.length != this.additionalFilterDataSource.length)) {
                this.resetCalculatedFilterExpr();
                this.selectedItemKeys.forEach((item: any, index: number) => {
                    this.calculateFilterExpr(item);
                    this.filterExprValue.push([this.AdditionalFilterDataField + "FilterExpr", "=", true]);
                    if (index < this.selectedItemKeys.length - 1) {
                        this.filterExprValue.push("or");
                    }
                });
            }
        } else {

            this.filterExprValue = [];
            if (this.selectedItemKeys.length > 0 
                && (this.additionalFilterDataSource == undefined || this.selectedItemKeys.length != this.additionalFilterDataSource.length)) {
                this.selectedItemKeys.forEach((item: any, index: number) => {
                    item = item == '(Blanks)' ? null : item;
                    this.filterExprValue.push([this.AdditionalFilterDataField, "=", item]);
                    if (index < this.selectedItemKeys.length - 1) {
                        this.filterExprValue.push("or");
                    }
                });
            }
        }

        this.maintainAdditionalFiltersDictionaryValue();
        this.setAdditionalFilterButtonStyle();
        var gridDataSource = this.DataControl.instance.getDataSource();
        gridDataSource.filter(this.getCombinedAdditionalFilterExpr());
        gridDataSource.load();
        //Console.log(this.AdditionalFiltersDictionary);
    }

    applyInitialFilter(selectedItems: string[] | number[]): void{
        setTimeout(() => {
            this.selectedItemKeys = selectedItems;
            this.applyFilter();
        });
    }

    showFilter(e: any) {
        this.IsVisible = true;
        this.MenuPosition = {
            my: "top",
            at: "bottom",
            of: "#" + this.filterButtonDivId,
            collision: "fit"
        };
    }

    getCombinedAdditionalFilterExpr(): any[] | null {
        var combinedExpr: any[] = [];        
        this._additionalFilterService.getFiltersFromDictionary(this.dataControlId).forEach((item: any, index: number) => {
            combinedExpr.push(item.filterExpr);
            if (index < this._additionalFilterService.getFiltersFromDictionary(this.dataControlId).length - 1) {
                combinedExpr.push("and");
            }
        });
        return combinedExpr.length > 0 ? combinedExpr : null;
    }

    clearFilter(): void {
        this.filterExprValue = [];
        this.maintainAdditionalFiltersDictionaryValue();

        var gridDataSource = this.DataControl.instance.getDataSource();
        gridDataSource.filter(this.getCombinedAdditionalFilterExpr());
        gridDataSource.load();
        this.setAdditionalFilterButtonStyle();
    }

    setAdditionalFilterButtonStyle(): void {
        if (this._additionalFilterService.getFiltersFromDictionary(this.dataControlId).find(item => { return item.dataField === this.AdditionalFilterDataField; }) != undefined) {
            $("#" + this.filterButtonDivId).find(".filter-icon").toggleClass("filter-active", true);
            this.onFilterStateChanged.emit(true);
        } else {
            $("#" + this.filterButtonDivId).find(".filter-icon").toggleClass("filter-active", false);
            this.onFilterStateChanged.emit(false);
        }
    }

    // maintaining dictionary to store already applied additional filters with their filter expression and selection
    maintainAdditionalFiltersDictionaryValue() {
        const addlFilter: AdditionalFilter = {
            dataField: this.AdditionalFilterDataField,
            filterExpr: this.filterExprValue,
            selectedItemKeys: this.selectedItemKeys
        };

        this._additionalFilterService.maintainFiltersInDictionary(this.dataControlId, addlFilter);
    }

    getSelectedItemKeys() {
        this.selectedItemKeys = [];
        this._additionalFilterService.getFiltersFromDictionary(this.dataControlId).forEach(item => {
            if (this.AdditionalFilterDataField === item.dataField) {
                this.selectedItemKeys = item.selectedItemKeys;
            }
        });
    }

    /*
     removes the current additional filter expression from the combimed filter expression to
    load all the available choices for the current additional filter
     */
    getCombinedButTheCurrentAdditionalFilterExpr(): any[] | null {
        var combinedExpr: any[] = [];
        this._additionalFilterService.getFiltersFromDictionary(this.dataControlId).forEach((item: any, index: number) => {
            if (this.AdditionalFilterDataField !== item.dataField) {
                if (combinedExpr.length > 0) {
                    combinedExpr.push("and");
                }

                combinedExpr.push(item.filterExpr);
            }
        });
        return combinedExpr.length > 0 ? combinedExpr : null;
    }

    resetCalculatedFilterExpr(): void {
        var filteredDataSet: any[] = [];
        var gridDataSource = this.DataControl.instance.getDataSource();
        gridDataSource.store().load().done(function (data: any) {
            filteredDataSet = data;
        });

        filteredDataSet.forEach(item => {
            item[this.AdditionalFilterDataField + "FilterExpr"] = false;
        });

        gridDataSource.load();
    }

    calculateFilterExpr(filterValue: any): void {
        filterValue = filterValue === "(Blanks)" ? null : filterValue;
        var filterValues: any[] = [];
        if (filterValue != null) {
            filterValues = filterValue.split(this.MultiValueDelimeter);
        }

        var filteredDataSet: any[] = [];
        var gridDataSource = this.DataControl.instance.getDataSource();
        gridDataSource.store().load().done(function (data: any) {
            filteredDataSet = data;
        });

        filteredDataSet.forEach(item => {

            var itemArray: any[] = [];
            var resArray: any[] = [];

            if (item[this.AdditionalFilterDataField] != undefined && item[this.AdditionalFilterDataField] != null) {
                itemArray = item[this.AdditionalFilterDataField].split(this.MultiValueDelimeter);
            }

            if (filterValue != null) {
                resArray = $.grep(itemArray, function (item, index) {
                    return ($.inArray(item, filterValues) >= 0 ? true : false);
                })

                if (resArray.length > 0) {
                    item[this.AdditionalFilterDataField + "FilterExpr"] = true;
                }
            } else {
                if (item[this.AdditionalFilterDataField] === undefined || item[this.AdditionalFilterDataField] === null
                    || item[this.AdditionalFilterDataField] === "" || $.inArray("", itemArray) >= 0
                ) {
                    item[this.AdditionalFilterDataField + "FilterExpr"] = true;
                }
            }
        });
    }

    prepareDataSourceForAdditionalFilter(): void {        
        var gridDataSource = this.DataControl.instance.getDataSource();                
        gridDataSource.filter(this.getCombinedButTheCurrentAdditionalFilterExpr());        
        var self = this;
        gridDataSource.store().load({
            filter: this.DataControl.instance.getCombinedFilter()
        }).done(function (data: any) {            
            setTimeout(() => {
                if (self.IsDataMultiValued) {
                    self.additionalFilterDataSource = self.getUniqueValuesOfKeysForMultiValuedColumn(data, self.AdditionalFilterDataField);
                } else {
                    self.additionalFilterDataSource = self.getUniqueValuesOfKey(data, self.AdditionalFilterDataField);
                }
                self._changeDetector.detectChanges(); // added change detector to suppress error partaining to changes in the selectedItemKeys
            }, 500);
        });
    }

    getUniqueValuesOfKeysForMultiValuedColumn(array: any[], key: string): any[] {
        var resultArray: any[] = [];
        array.forEach(item => {
            var itemVal = item[key] != undefined && item[key] != null && item[key] != "" ? item[key] : "(Blanks)";
            var tempArray = itemVal.split(this.MultiValueDelimeter);
            for (let itm of tempArray) {
                itm = itm != "" ? itm : "(Blanks)";
                resultArray.push({
                    key: itm,
                    text: itm
                });
            }
        });

        return this.removeDuplicates(resultArray, "key").sort();
    }

    getUniqueValuesOfKey(array: any[], key: string): any[] {
        var resultArray: any[] = [];

        array.forEach(item => {
            var itemVal = item[key] != undefined && item[key] != null && item[key] != "" ? item[key] : "(Blanks)";
            resultArray.push({
                key: itemVal,
                text: itemVal
            });
        });
         
        return this.removeDuplicates(resultArray, "key").sort();                
    }

    removeDuplicates(myArr: any, prop: any): any[] {
        //let res: any[] = myArr.filter((obj: any, pos: any, arr: any) => {
        //    return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
        //});

        let length = myArr.length, result = [], seen = new Set(), res: any[];
        
        for (let index = 0; index < length; index++) {
            let value = myArr[index][prop];
            if (seen.has(value))
                continue;
            seen.add(value);
            result.push(value);
        }                

        return result;
    };

    ngOnInit() {
        //need to get the id of the datagrid or treelist or similar data control
        // this id is going to be the key of the filter dictionary
        this.dataControlId = $($($(this.DataControl).attr('element')).attr('nativeElement')).attr('id');
        this.filterButtonDivId = "dv-" + this.dataControlId + "_" + this.AdditionalFilterDataField;
    }

    ngOnDestroy() {
        this._additionalFilterService.removeFiltersFromDictionary(this.dataControlId);
    }

    onPopupShowing(e: any) {
        this.getSelectedItemKeys();
        this.prepareDataSourceForAdditionalFilter();
    }

    popupHiding(e: any) {
        this.IsVisible = false;
        var dummyNull: any = null;
        this.additionalFilterDataSource = dummyNull;
    }
}