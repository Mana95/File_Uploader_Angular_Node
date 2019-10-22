import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../_services';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent implements OnInit {
  error = '';
  loading = false;
  constructor(

    private router: Router,
    private JobService: JobService,
    private authenticationService: AuthenticationService

  ) { }

  userdata: any;
  useRole: any;

  // userdata: any = [
  //   // tslint:disable-next-line:max-line-length
  //   {jobid: '02231', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Pending'},
  //   {jobid: '02258', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Completed'},
  //   {jobid: '03569', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Inprogress'},
  //   {jobid: '04784', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Pending'},
  //   {jobid: '11147', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Pending'},
  //   {jobid: '88852', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'CompletedFail'},
  //   {jobid: '96874', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Pending'},
  //   {jobid: '789456', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'Inprogress'},
  //   {jobid: '58742', user: 'Saman Kumara', assigneUser: 'P.D Gamage', createDate: '2019/04/25', createTime: '05.00.45', status: 'CompletedFail'}
  // ];

  viewDisplayData() {

    this.JobService.getAllJobs()
      .subscribe(
        data => {
          this.userdata = data
          console.log(data);
        }
      );
  }

  ngOnInit() {


    this.JobService.getAllJobs()
      .subscribe(
        data => {
          this.userdata = data
          console.log(data);
        }
      );

    this.authenticationService.getAllUsers()
      .subscribe(
        data => {
          this.useRole = data
          console.log(data);
        }
      );
  }

  saveRole($event, data) {

    const role = $event.target.value;
    
    // alert( "This is typescript method"  +  role);

    this.JobService.updateAssignUser(role, data.id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  getRecord(data) {

    let id = data.id

    // this.JobService.getById() 
    // .subscribe(
    //   iddata => {
    //    this.userdata = iddata
    //     console.log("subcribe" + iddata);
    //   }
    // );
    this.router.navigate(['/downloads', data.id]);
    console.log("this is the number which have been passed to the download page " + data.id);

  }

}
