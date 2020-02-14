import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-allocation',
  templateUrl: './resource-allocation.component.html',
  styleUrls: ['./resource-allocation.component.css']
})
export class ResourceAllocationComponent implements OnInit {

  constructor() {
    this.displayForecastForPeriod = this.displayForecastForPeriod.bind(this);
    this.calculateRemainder = this.calculateRemainder.bind(this);
   }

  years: string[] = [];
  monthIndices: any[] = [];
  forecast: Forecast;
  availability: ResourceAvailability[];
  allocation: ResourceAllocation[] = [];

  populateForecast(): void {
    this.forecast = {
      Protocol: 'P1',
      Country: 'USA',
      Role: 'Trial Manager',
      Jan_2020: 0.94,
      Feb_2020: 0.96,
      Mar_2020: 0.79,
      Apr_2020: 1.09,
      May_2020: 1.36,
      Jun_2020: 0.99,
      Jul_2020: 1.30,
      Aug_2020: 0.56,
      Sep_2020: 0.89,
      Oct_2020: 1.29,
      Nov_2020: 1.33,
      Dec_2020: 0.23
    }
  }

  populateAvailability() : void{
    this.availability = [{
      Role: 'Trial Manager',
      WWID: '1039438934',
      Jan_2020: 0.50,
      Feb_2020: 0.50,
      Mar_2020: 0.50,
      Apr_2020: 0.25,
      May_2020: 1.00,
      Jun_2020: 0.23,
      Jul_2020: 0.40,
      Aug_2020: 0.50,
      Sep_2020: 0.45,
      Oct_2020: 0.39,
      Nov_2020: 0.33,
      Dec_2020: 0.12
    },{
      Role: 'Trial Manager',
      WWID: '702053125',
      Jan_2020: 0.50,
      Feb_2020: 0.50,
      Mar_2020: 0.50,
      Apr_2020: 0.50,
      May_2020: 0.50,
      Jun_2020: 0.50,
      Jul_2020: 0.50,
      Aug_2020: 0.50,
      Sep_2020: 1.00,
      Oct_2020: 1.00,
      Nov_2020: 1.00,
      Dec_2020: 0.25
    }];
  }
  
  populateAllocation(): void {
    this.allocation = [{
      Protocol: 'P1',
      Country: 'USA',
      Role: 'Trial Manager',
      WWID: '1039438934',
      ContractType: 'FTE',
      Department: 'DATA MANAGEMENT',
      CostCenter: 108885,
      Comment: '',
      Jan_2020: 0.67,
      Feb_2020: 0.32,
      Mar_2020: 0.13,
      Apr_2020: 0.49,
      May_2020: 1.09,
      Jun_2020: 0.23,
      Jul_2020: 0.40,
      Aug_2020: 0.50,
      Sep_2020: 0.45,
      Oct_2020: 0.39,
      Nov_2020: 0.33,
      Dec_2020: 0.12
    },{
      Protocol: 'P1',
      Country: 'USA',
      Role: 'Trial Manager',
      WWID: '702053125',
      ContractType: 'FLEX',
      Department: 'DATA MANAGEMENT',
      CostCenter: 108885,
      Comment: '',
      Jan_2020: 0.24,
      Feb_2020: 0.33,
      Mar_2020: 0.46,
      Apr_2020: 0.12,
      May_2020: 0.36,
      Jun_2020: 0.39,
      Jul_2020: 0.50,
      Aug_2020: 0.23,
      Sep_2020: 0.75,
      Oct_2020: 0.40,
      Nov_2020: 1.01,
      Dec_2020: 0.45
    }];
  }

  ngOnInit() {
    this.years = this.calculateYearRange();
    this.monthIndices = this.calculateMonthRange();
    this.populateAvailability();
    this.populateForecast();
    this.populateAllocation();
  }

  displayForecastForPeriod(itemInfo: any){
    const dataField = itemInfo.valueText;
    const forecast = this.getForeCastForPeriod(dataField);
    return forecast != undefined ? forecast : 'N/A' ;
  }

  calculateRemainder(itemInfo: any){
    //console.log(itemInfo);
    const dataField = itemInfo.valueText;
    let forecast = this.getForeCastForPeriod(dataField);
    var remaining = forecast - itemInfo.value;

    if(!isNaN(remaining)){
      return remaining.toFixed(2);
    } else{
      return "";
    }
  }

  isAllocationAllowed(cellInfo: any): boolean{
    let dataField = cellInfo.column.dataField;
    var forecast = this.getForeCastForPeriod(dataField);
    return forecast != undefined;
  }

  getForeCastForPeriod(period: string){
    return this.forecast[period]
  }

  fixedDecimal(value: number): string {   //Format total value
    if (value % 1 != 0)
        return value.toFixed(2);
    return value.toString();
  }

  onAllocationCellPrepared(e: any){
    if (e.rowType === 'totalFooter' && e.column.caption !== 'Comment' && e.summaryItems.length > 0) {
      var forecast = this.getForeCastForPeriod(e.summaryItems[0].column);
      
      if(e.summaryItems[0].value > forecast){
        e.cellElement.style.backgroundColor = "orange"; 
      }
    }
  }

  onCellPreparedOptionTwo(e: any): void{
    if (e.rowType === 'data'){
      
    }
    if (e.rowType === 'totalFooter' && e.column.caption !== 'Comment' && e.summaryItems.length > 0) {
      var forecast = this.getForeCastForPeriod(e.summaryItems[0].column);
      
      if(e.summaryItems[0].value > forecast){
        e.cellElement.style.backgroundColor = "#E99A53"; 
      }
    }
  }



  // supproting funciotns
  public currentDate = new Date();
  public currentYear = this.currentDate.getFullYear();
  public quarters: number[] = [1, 2, 3, 4];
  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public monthNames: string[] = ["NA", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  getCurrentQuarter() {
    var currentMonth = this.currentDate.getMonth();
    return this.quarters[Math.floor(currentMonth / 3)];
  }

  getQuarter(date: Date) {
    return this.quarters[Math.floor(date.getMonth() / 3)];
  }

  getStartMonthPerQuater(quarter: number): number {
    if(quarter == 1){
      return 1;
    } else if(quarter == 2){
      return 4;
    } else if(quarter == 3){
      return 7;
    } else if(quarter == 4){
      return 10
    }
  }

  calculateYearRange(){
    var pqd = new Date()
    pqd.setMonth(pqd.getMonth() - 3);
    var lqd = new Date();
    lqd.setMonth(lqd.getMonth() + 12);

    var prevQtrYear = pqd.getFullYear();
    var lastQtrYear = lqd.getFullYear();

    let Years = [];
        for (var year = prevQtrYear; year <= lastQtrYear; year++) {
            Years.push(year);
        }
    return Years;
  }

  calculateMonthRange(){
    var pqd = new Date()
    pqd.setMonth(pqd.getMonth() - 3);
    var lqd = new Date();
    lqd.setMonth(lqd.getMonth() + 12);

    var prevQtrYear = pqd.getFullYear();
    var lastQtrYear = lqd.getFullYear();

    var prevQtr = this.getQuarter(pqd);
    var lastQtr = this.getQuarter(lqd);

    let Months: any[] = [];

    for (let year = prevQtrYear; year <= lastQtrYear; year++){
      let months = [];
            for (let month of this.months) {
                if (!((year == prevQtrYear && month < this.getStartMonthPerQuater(prevQtr)) 
                || (year == lastQtrYear && month >= this.getStartMonthPerQuater(lastQtr) + 3)))
                    months.push(month);
            }
        Months[year] = months;
    }

    return Months;
  }

}

export class Forecast{
  Protocol: string;
  Country: string;
  Role: string;
  Jan_2020: number;
  Feb_2020: number;
  Mar_2020: number;
  Apr_2020: number;
  May_2020: number;
  Jun_2020: number;
  Jul_2020: number;
  Aug_2020: number;
  Sep_2020: number;
  Oct_2020: number;
  Nov_2020: number;
  Dec_2020: number;
}

export class ResourceAllocation{
  Protocol: string;
  Country: string;
  Role: string;
  WWID: string;
  ContractType: string;
  Department: string;
  CostCenter: number;
  Comment: string;
  Jan_2020: number;
  Feb_2020: number;
  Mar_2020: number;
  Apr_2020: number;
  May_2020: number;
  Jun_2020: number;
  Jul_2020: number;
  Aug_2020: number;
  Sep_2020: number;
  Oct_2020: number;
  Nov_2020: number;
  Dec_2020: number;
}

export class ResourceAvailability{
  WWID: string;
  Role: string;
  Jan_2020: number;
  Feb_2020: number;
  Mar_2020: number;
  Apr_2020: number;
  May_2020: number;
  Jun_2020: number;
  Jul_2020: number;
  Aug_2020: number;
  Sep_2020: number;
  Oct_2020: number;
  Nov_2020: number;
  Dec_2020: number;
}
