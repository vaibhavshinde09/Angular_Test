import { Component, OnInit } from '@angular/core';

const EMPLOYEES: any[] = [
  {"id": 11, "name":"Ash", "department": "Finance", "joining_date": "8/10/2016"},
  {"id": 12, "name": "John","department": "HR","joining_date": "18/1/2011"},
  {"id": 13, "name": "Zuri","department": "Operations", "joining_date": "28/11/2019"},
  {"id": 14, "name": "Vish","department": "Development", "joining_date": "7/7/2017"},
  {"id": 15, "name": "Barry", "department": "Operations", "joining_date": "19/8/2014"},
  {"id": 16,"name": "Ady", "department": "Finance","joining_date": "5/10/2014"},
  { "id": 17,"name":"Gare","department": "Development", "joining_date": "6/4/2014"},
  { "id": 18, "name": "Hola", "department": "Development", "joining_date": "8/12/2010"},
  {"id": 19, "name": "Ola","department": "HR", "joining_date": "7/5/2011"},
  {"id": 20, "name": "Kim", "department": "Finance", "joining_date": "20/10/2010"}
];
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  employees:any[] = EMPLOYEES;
  dept:string|undefined;

  constructor() { }

  ngOnInit(): void {
  }
  getDistinctEmployeesDept():any[]{
    /**
     * gives distinct department list
    */
    return [...new Set(this.employees.map(a => a.department))];
  }

  getDistinctDeptWithCount(key:string):any{
    /**
     * Get count by departments
    */
    var output = 0;
    this.employees.map(e=>{if(e.department===key){output++;}});
    return output;
  }

  onSearchChange(event:Event|any){
    /**
     * filter the employees array by emp name
     * Assign orignal dataset if search string is empty
    */
    if(event.target.value === undefined||event.target.value === ""){
      // if user removes the filter string we must show whole list.
      // therefore this is needed.
      this.employees = EMPLOYEES;
      return;
    }
    this.employees = EMPLOYEES.filter(ele => {return(ele.name.toLowerCase().startsWith(event.target.value.toLowerCase()))});
  }
  sortByName(event?:any){
    /**
     * Sort the employees array by emp name
    */
    this.employees.sort((a,b)=>{if( a.name<b.name )return -1;if( a.name>b.name)return 1;return 0;});
  }
  sortByDate(event?:any){
    /**
     * Sort the employees array by emp joining date
    */
    this.employees.sort((a,b)=>{return (+this.getDateFromStr(a.joining_date))-(+this.getDateFromStr(b.joining_date))});
  }
  experienceMoreThan2Years(event?:any){
    /**
     * filter the employees array whos experience is greater than 2 year
    */
    this.employees = this.employees.filter((ele)=>{ return diff_year(this.getDateFromStr(ele.joining_date),new Date()) > 2 });
  }
  removeAllCandidatesFromDevelopment(dept:any){
    /**
     * removes the all emp from selected/provided department
    */
    this.employees = this.employees.filter((ele)=>{ return ele.department !== dept });
  }
  getDateFromStr(dateStr:string){
    let arr = dateStr.split("/")
    return new Date((+arr[2]),(+arr[1]-1),(+arr[0]));
  }

}
function diff_year(startDate:Date, endDate:Date) {
  /**
   * gives the difference in years between 2 dates
  */
  const diffMilliSeconds = Math.abs(+endDate - +startDate);
  const diffDays = Math.ceil(diffMilliSeconds / (1000 * 60 * 60 * 24));
  const diffYears = diffDays/365;
  return diffYears;
}
