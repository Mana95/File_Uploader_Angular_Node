import { User } from './../_models/user';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Guid } from "guid-typescript";

import { AuthenticationService } from '../_services';
import { JobService } from '../_services';

import * as moment from 'moment';
import { config } from '../config/config.js';
import { UnderscorePipe } from 'ngx-pipes';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UnderscorePipe]
})

export class UploadComponent implements OnInit {

  public id: Guid;

  submitted = false;

  loading = false;
  error = '';
  uploadForm: FormGroup;
  currentUser: User;

  currentDate: any;
  currentTime: any;
  locaionPath: any;
   
 
  get f() {
    return this.uploadForm.controls;

  }

  get username() {

    return this.uploadForm.controls.username;

  }

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private JobService: JobService,
    private uderscorePipe: UnderscorePipe
  )
  //Getting the usemodel current values
  { 

    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    
    this.uploadForm = this.fb.group({
      
      type: [null],
      userDrop: ['--Selected--'],
      jobname: ['', Validators.required],
      jobDescription:['', Validators.required],

    
     
      templates: ["--Select--"],
    });
    
    this.authenticationService.getAllUsers()
      .subscribe(
        data => {
          this.useRole = data
          console.log(data);
        }
      );

    this.templates = ["Template 1","Template 2","Template 3","Template 4"];
  }

  filedata: any;
  filedetails: any;
  

  //autoGen
  jobGud: any;
  templatevalue: any;
  useRole: any

  assignUser: any;

  currentstatus :'new';

  //get the template value
  getTemp(event) {
   // alert(event.target.value);
   this.templatevalue = event.target.value;
  }

  templates:any;

  getUserRole(event) {

    this.assignUser = event.target.value;
    
  }


  uploadSubmit() {

    this.submitted = true;
      
    console.log("This is the UploadSumbmit");
    for (var i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      console.log("Here is the UploadSubmit method" + fileItem);
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }

    this.jobGud = Guid.create()["value"] ;
   
    this.currentTime = moment().format('LT');
    this.currentDate = moment().subtract(10, 'days').calendar();

    console.log( "This is the currentTime" + this.currentTime);

    let nameoffile;
    for (var j = 0; j < this.uploader.queue.length; j++) {


      let data = new FormData();

      console.log(JSON.stringify(data));
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem);
      console.log(fileItem.name);
      console.log(fileItem.size);


      this.id = Guid.create();

  
      data.append('file', fileItem);
      data.append('fileSeq', 'seq' + j);
      data.append('dataType', this.uploadForm.controls.type.value);
      
      this.uploadFile(data, this.jobGud).subscribe(
(res) => {

  console.log("This is the reposne " + res.path);
      this.locaionPath = res.path;

}
      );

      this.filedata = fileItem;
      //The File is Convert into uderscore
      let fileuderscore = fileItem.name;
      let formatFile = this.uderscorePipe.transform(fileuderscore);
      alert(formatFile);

      this.filedetails = fileItem;

      let jobObj = {

       "uniqueId":  Guid.create()["value"] ,  "id" : this.jobGud , "jobname": this.f.jobname.value, "jobDescription": this.f.jobDescription.value, "filename": this.filedetails.name, "itemsize": this.filedetails.size, "itemtemp":  this.f.templates.value , "assignUser": this.assignUser, "username": this.currentUser.username, "status": "new", "createdDate": this.currentDate , "createdTime": this.currentTime
  
      }
  
      console.log("Data base values" + JSON.stringify(jobObj));
  
      this.authenticationService.upload(jobObj)
        .subscribe(
          data => {
            console.log("subcribe" + JSON.stringify(data));
          },
          error => {
            this.error = error;
            this.loading = false;
          });   
    }

    //Insert in to job table
    let jobs = {

      "id" :  this.jobGud,  "assignUser": this.assignUser, "username": this.currentUser.username, "jobDescription": this.f.jobDescription.value, "status": "new" , "createdTime": this.currentTime , "jobname": this.f.jobname.value

    }

    console.log("Data base values for Jobs Collection" + JSON.stringify(jobs));
    this.JobService.jobupload(jobs)
    .subscribe(
      data => {
        console.log("subcribe" + JSON.stringify(data));
      },
      error => {
        this.error = error;
        this.loading = false;
      });   

      
    // let userParam = {

    //   "jobname": this.f.jobname.value, "filename": this.filedetails.name, "itemsize": this.filedetails.size, "itemtemp": this.f.filetemplate.value

    // }

    // console.log("Data base values" + userParam);

    // this.authenticationService.upload(userParam)

    //   .subscribe(
    //     data => {
    //       console.log("subcribe" + JSON.stringify(data));
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });

    this.uploader.clearQueue();
    
    if(this.uploadForm.valid) 
    {
       //   alert("Data successfully saved");
          this.submitted = false;
          this.uploadForm.reset();
    
    }else {
    
      //  alert("This is invalid");
    
    }
    
    

  }

  uploadFile(data: FormData, uniqueId: any): Observable<any> {
    // tslint:disable-next-line:no-debugger
  //  alert("This is the "+uniqueId);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
    

  }

 
}
