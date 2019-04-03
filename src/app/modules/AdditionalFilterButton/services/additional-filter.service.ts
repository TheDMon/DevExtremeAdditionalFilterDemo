import { Injectable } from '@angular/core';
import { AdditionalFilter } from '../models/additional-filter';

@Injectable()
export class AdditionalFilterService {

  private _additionalFilterDictionary = new Map<string, AdditionalFilter[]>();

  constructor() { }

  getFiltersFromDictionary(key: string): AdditionalFilter[] {
    return this._additionalFilterDictionary.get(key) || [];
  }

  maintainFiltersInDictionary(key: string, additionalFilterObject: AdditionalFilter): void {
    if(this._additionalFilterDictionary.has(key)){
      var additionalFilterItem = this._additionalFilterDictionary.get(key).find(item => {
        return item.dataField === additionalFilterObject.dataField;
    });

    
    //if an entry is already present update the item otherwise insert the item in the dictionary
    if (additionalFilterItem != undefined) {
        if (additionalFilterObject.filterExpr.length > 0) {
            additionalFilterItem.filterExpr = additionalFilterObject.filterExpr;
            additionalFilterItem.selectedItemKeys = additionalFilterObject.selectedItemKeys;
        } else {
            var pos = this._additionalFilterDictionary.get(key).indexOf(additionalFilterItem);
            if (pos > -1) {
              this._additionalFilterDictionary.get(key).splice(pos, 1);
            }
        }
    } else {
        if (additionalFilterObject.filterExpr.length > 0) {
          this._additionalFilterDictionary.get(key).push(additionalFilterObject);
        }
    }
    } else {
      this._additionalFilterDictionary.set(key, [ additionalFilterObject ]);
    }

    //console.log('printing from addl ftr svc',this._additionalFilterDictionary);
  }
  
  removeFiltersFromDictionary(key: string): void{
    this._additionalFilterDictionary.delete(key);
  }
}