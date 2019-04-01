import { Injectable } from '@angular/core';
import { AdditionalFilter } from '../models/additional-filter';

@Injectable()
export class AdditionalFilterService {
  private _additionalFilterDictionary: AdditionalFilter[] = [];

  constructor() { }

  getFilterDictionary(): AdditionalFilter[] {
    return this._additionalFilterDictionary;
  }

  maintainFilterDictionary(additionalFilterObject: AdditionalFilter): void {
    var additionalFilterItem = this._additionalFilterDictionary.find(item => {
        return item.dataField === additionalFilterObject.dataField;
    });
    // if an entry is already present update the item otherwise insert the item in the dictionary
    if (additionalFilterItem != undefined) {
        if (additionalFilterObject.filterExpr.length > 0) {
            additionalFilterItem.filterExpr = additionalFilterObject.filterExpr;
            additionalFilterItem.selectedItemKeys = additionalFilterObject.selectedItemKeys;
        } else {
            var pos = this._additionalFilterDictionary.indexOf(additionalFilterItem);
            if (pos > -1) {
                this._additionalFilterDictionary.splice(pos, 1);
            }
        }
    } else {
        if (additionalFilterObject.filterExpr.length > 0) {
            this._additionalFilterDictionary.push(additionalFilterObject);
        }
    }
  }
  

}