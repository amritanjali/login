import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import{TimeSheet, DispalyTimeService} from './dispaly-time.service';
import { error } from '@angular/compiler/src/util';
import { Router, ActivatedRoute } from '@angular/router';
import{AuthenticationService} from'../shared/authentication.service'
import{UserService} from'../shared/user.service'



@Component({
  selector: 'app-display-timesheet',
  templateUrl: './display-timesheet.component.html',
  styleUrls: ['./display-timesheet.component.scss']
})
export class DisplayTimesheetComponent implements OnInit {
  val: number;
  public timesheets:any
  headerCols: string[] = [];
  contentBody = [];
  display: boolean = false;
  public updateTimeSheetDesription:any
  public  updateTimeSheetHour: any
  public differentd: any
  public popdate: any
  public getSaveData: any
  public  updateTimeSheetId: any
  public isDataSave= false
  public getdayNumb: any
  public updateData: any
  public checkShowMe : boolean = true
  public getdate: any
  public daysIdN: any
  public loaderShow: boolean= true;
  public isChecked: boolean = false;
  public displayApprovalSheet: boolean= false;
  public timehr: any;
  public daysCheck = false;
  public timesheetObje ={}
  public dayskey: string= "day";
  public dateKey : string ="date";
  public hourKey: string ="hour";
  public decsriptionKey: string ="description";
  public approvalTimesheetdata = [];
  public approvalTimesheet: any
  public craetedData: any;
  public idKey: string ="id";
  public satDay: string ="Saturday";
  public sunDay: string ="Sunday";
  public cureentUser: any ={};
  public displayTimesheet:boolean = true;
  public updateProfileShow = false;
  public allDataCheck  = false;
  public checkedLabe =""
  constructor(private displayTimeSheet: DispalyTimeService, private router: Router, private authenticationService:AuthenticationService,
    private userService: UserService,
    @Inject(DOCUMENT) private _document: Document
    ) { }
  ngOnInit() {
 
  this.getTimesheeetdata()
  }
  getTimesheeetdata(){
    this.displayTimeSheet.getTimeSheet().subscribe((data)=> {

      
      this.timesheets = data;
      this.loaderShow = false

// console.log(this.timesheets)
  if(this.timesheets.day="Saturday"){
        // this.bgCss  = true
        
  }
  })
  }
  openDialogBox(days, daysNumb, daysId, hr){
    this.display= true;
    this.popdate = days;
    this.getdayNumb = daysNumb
    this.daysIdN = daysId
    this.timehr =hr


  
      this.displayTimeSheet.getUpdatedTimesheet(this.daysIdN).subscribe((data)=>{
        this.getSaveData = data;
        this.updateTimeSheetDesription = this.getSaveData.description;
        this.updateTimeSheetHour = this.timehr;
        console.log(this.getSaveData)
        console.log(this.getSaveData.id )
        console.log(this.getSaveData.description)
    })
    

  }

  saveUpdateTimesheet(dysN, dyI ){
     this.getdate =dysN,
     this.daysIdN = dyI
    this.displayTimeSheet.postUpdatedTimesheet(this.updateTimeSheetHour, this.updateTimeSheetDesription,  this.daysIdN  ).subscribe((data:any)=>{
  
      this.updateData =data
      this.updateTimeSheetHour = this.timehr
      this.updateTimeSheetDesription = this.updateData.description;
      this.display= false;
      this.isDataSave === true
      console.log(this.updateData.description)
      this.getTimesheeetdata()
      
    })

    
  }
  refreshPage() {

    this._document.defaultView.location.reload();
   
  }
  toggleEditable(event, days, daysNumb, hr, updateTimeSheetDesription, daysId) {
    if ( event.target.checked ) {
        console.log("checked" + event.target)
        this.timesheetObje = {};
        this.timesheetObje[this.dayskey] = days
        this.timesheetObje[this.dateKey] = daysNumb
        this.timesheetObje[this.hourKey] = hr
        this.timesheetObje[this.idKey] = daysId
        this.timesheetObje[this.decsriptionKey] = updateTimeSheetDesription
        console.log(this.timesheetObje)
        if(this.timesheetObje[this.decsriptionKey]===""){
          updateTimeSheetDesription = "No description"
        }
        this.approvalTimesheetdata.push(this.timesheetObje);
        this.allDataCheck = true;
   }

   console.log(this.approvalTimesheetdata)
 
}

sendApproval(){
  // return this.approvalTimesheetdata
  // console.log(this.approvalTimesheetdata)
  this.displayApprovalSheet = true;
}
// logoutClick(){
//   // localStorage.removeItem("")
  
//   this.router.navigate(['/login'])
// }
// seeProfile(){
//    this.displayTimesheet = false
// }
// back(){
//   this.displayTimesheet = true;
// }
// userList(){
//   this.router.navigate(['./user-list'])
// }

updateProfile(){
  this.updateProfileShow = true;
  this.displayTimesheet = true
}
selectAllCheck(id){
// this.checkedLabel ="checked"  
console.log("select all" + this.timesheets.length)
}
sendMail(){
  this.userService.sendMail(this.getdate).subscribe(
    data=>console.log(data)
  )
}
}
