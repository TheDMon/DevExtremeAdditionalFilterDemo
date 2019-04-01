import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AdditionalFilter } from '../../models/additional-filter';
import { AdditionalFilterService } from '../../services/additional-filter.service';
import * as $ from 'jquery';

@Component({
    selector: 'additional-filter-button',
    templateUrl: './additional-filter-button.component.html',
    styleUrls: ['./additional-filter-button.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdditionalFilterButtonComponent implements OnInit, OnChanges {
    public IsVisible: boolean = false;
    public MenuPosition: any;

    @Input() FilterID: string;
    @Input() AdditionalFilterDataField: string;
    @Input() DataGrid: DxDataGridComponent;
    @Input() AdditionalFiltersDictionary: AdditionalFilter[] = []; // don't want this to come as input
    @Input() IsDataMultiValued: boolean = false;
    @Input() MultiValueDelimeter: string = ",";
    @Output() onOKButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFilterStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    public selectedItemKeys: any[] = [];
    public additionalFilterDataSource: any[];
    public applyFilterButtonOptions: any;
    public cancelButtonOptions: any;
    public filterExprValue: any[] = [];

    constructor(private _additionalFilterService: AdditionalFilterService) {
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
            if (this.selectedItemKeys.length > 0 && this.selectedItemKeys.length != this.additionalFilterDataSource.length) {
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
            if (this.selectedItemKeys.length > 0 && this.selectedItemKeys.length != this.additionalFilterDataSource.length) {
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
        var gridDataSource = this.DataGrid.instance.getDataSource();
        gridDataSource.filter(this.getCombinedAdditionalFilterExpr());
        gridDataSource.load();
        //Console.log(this.AdditionalFiltersDictionary);
    }

    showFilter(e: any) {
        this.IsVisible = true;
        this.MenuPosition = {
            my: "top",
            at: "bottom",
            of: "#" + this.FilterID,
            collision: "fit"
        };
    }

    getCombinedAdditionalFilterExpr(): any[] | null {
        var combinedExpr: any[] = [];        
        this._additionalFilterService.getDictionary().forEach((item: any, index: number) => {
            combinedExpr.push(item.filterExpr);
            if (index < this._additionalFilterService.getDictionary().length - 1) {
                combinedExpr.push("and");
            }
        });
        return combinedExpr.length > 0 ? combinedExpr : null;
    }

    clearFilter(): void {
        this.filterExprValue = [];
        this.maintainAdditionalFiltersDictionaryValue();

        var gridDataSource = this.DataGrid.instance.getDataSource();
        gridDataSource.filter(this.getCombinedAdditionalFilterExpr());
        gridDataSource.load();
        this.setAdditionalFilterButtonStyle();
    }

    setAdditionalFilterButtonStyle(): void {
        if (this._additionalFilterService.getDictionary().find(item => { return item.dataField === this.AdditionalFilterDataField; }) != undefined) {
            $("#" + this.FilterID).find(".filter-icon").toggleClass("filter-active", true);
            this.onFilterStateChanged.emit(true);
        } else {
            $("#" + this.FilterID).find(".filter-icon").toggleClass("filter-active", false);
            this.onFilterStateChanged.emit(false);
        }
    }

    // maintaining dictionary to store already applied additional filters with their filter expression and selection
    maintainAdditionalFiltersDictionaryValue() {
        const addlFilter = {
            dataField: this.AdditionalFilterDataField,
            filterExpr: this.filterExprValue,
            selectedItemKeys: this.selectedItemKeys
        };

        this._additionalFilterService.maintainDictionary(addlFilter);

        
        // var additionalFilterItem = this.AdditionalFiltersDictionary.find(item => {
        //     return item.dataField === this.AdditionalFilterDataField;
        // });

        // if (additionalFilterItem != undefined) {
        //     if (this.filterExprValue.length > 0) {
        //         additionalFilterItem.filterExpr = this.filterExprValue;
        //         additionalFilterItem.selectedItemKeys = this.selectedItemKeys;
        //     } else {
        //         var pos = this.AdditionalFiltersDictionary.indexOf(additionalFilterItem);
        //         if (pos > -1) {
        //             this.AdditionalFiltersDictionary.splice(pos, 1);
        //         }
        //     }
        // } else {
        //     if (this.filterExprValue.length > 0) {
        //         this.AdditionalFiltersDictionary.push(
        //             {
                        
        //                 dataField: this.AdditionalFilterDataField,
        //                 filterExpr: this.filterExprValue,
        //                 selectedItemKeys: this.selectedItemKeys
        //             }
        //         );
        //     }
        // }

        //Console.log("maintainAdditionalFiltersDictionaryValue", this.AdditionalFiltersDictionary);
    }

    getSelectedItemKeys() {
        this.selectedItemKeys = [];
        this._additionalFilterService.getDictionary().forEach(item => {
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
        this._additionalFilterService.getDictionary().forEach((item: any, index: number) => {
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
        var gridDataSource = this.DataGrid.instance.getDataSource();
        gridDataSource.store().load().done(function (data: any) {
            filteredDataSet = data;
        });

        filteredDataSet.forEach(item => {
            item[this.AdditionalFilterDataField + "FilterExpr"] = false;
        });

        gridDataSource.load(); // not sure if needed
    }

    calculateFilterExpr(filterValue: any): void {
        filterValue = filterValue === "(Blanks)" ? null : filterValue;
        var filterValues: any[] = [];
        if (filterValue != null) {
            filterValues = filterValue.split(this.MultiValueDelimeter);
        }

        var filteredDataSet: any[] = [];
        var gridDataSource = this.DataGrid.instance.getDataSource();
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

        //Console.log("calculateFilterExpr", filteredDataSet);
    }


    prepareDataSourceForAdditionalFilter(): void {        
        var gridDataSource = this.DataGrid.instance.getDataSource();                
        gridDataSource.filter(this.getCombinedButTheCurrentAdditionalFilterExpr());        
        var self = this;
        gridDataSource.store().load({
            filter: this.DataGrid.instance.getCombinedFilter()
        }).done(function (data: any) {            
            setTimeout(() => {
                if (self.IsDataMultiValued) {
                    self.additionalFilterDataSource = self.getUniqueValuesOfKeysForMultiValuedColumn(data, self.AdditionalFilterDataField);
                } else {
                    self.additionalFilterDataSource = self.getUniqueValuesOfKey(data, self.AdditionalFilterDataField);
                }
            }, 1000);
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
    }

    ngOnChanges() {
        this.setAdditionalFilterButtonStyle();
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