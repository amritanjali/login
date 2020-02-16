import { Component, OnInit } from '@angular/core';
import{UserService} from'../shared/user.service'
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import{SecureSessionStoragService} from'../shared/secure-session-storag.service';
import{AuthenticationService} from'../shared/authentication.service'
import{ ErrorHandlerService} from'../shared/error-handler.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public cureentUser:any ={}
public displayTimesheet = true
  constructor(private userService: UserService, private router: Router, private secureSessionStoragService: SecureSessionStoragService,
    private authenticationService: AuthenticationService,
    private  errorHandlerService:  ErrorHandlerService
    ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data=>{
      console.log("cureent user=============>" + data)
      this.cureentUser = data;

    },
    error => {
      console.log(error.error.message)
      this.errorHandlerService.errorHandler(error)
    }
    )
  }
  logoutClick(){
  this.authenticationService.logOut()
  }
  userList(){
    this.router.navigate(['dashboard/user-list'])
  }
  seeProfile(){
    this.router.navigate(['dashboard/user-profile'])
}
timesheetShow(){
this.router.navigate(['dashboard/timesheet'])
}

}
