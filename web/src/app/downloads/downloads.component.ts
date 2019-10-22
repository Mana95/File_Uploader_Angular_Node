import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {JobService, AuthenticationService} from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { config } from '../config/config.js';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {
  sendMailForm: FormGroup;
  comments: string;
  count: number;
  public ifClick = false;
  submitted = false;
  
  selectedFeaturesFile: any = [];
  selectedComment : any = [];

  assign : any;
  displayReplyFrom = false
  mailUrl : any;
  error = '';
  loading = false;
  isDisabled = false;
  isInitial = true;
  commentData : any;

  constructor(private route: ActivatedRoute,
    private JobService: JobService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { }

    
     downlods: any;
    currentStatusemail : any;
     uploadForm: FormGroup;
     commentForm: FormGroup;
  
    id: any;

 

  ngOnInit() {
    this.sendMailForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]]
    });





    this.count = 0;
    //this is pass the Url ID to this component
    this.id = (this.route.snapshot.paramMap.get('jobid'));
    console.log("This is the ngOnInit" + this.id);
    //calling the JobService
    this.JobService.getById(this.id)
    .subscribe(
      data => {
       this.downlods = data
        this.assign = data
        this.currentStatusemail = this.assign[0].status;
        console.log(this.currentStatusemail)
      }
    );

    this.JobService.getByIdComments(this.id)
    .subscribe(
      data => {
       this.commentData = data
        console.log(this.commentData);
      }
    );







  }
   currentCompleter : any;

   get f() {

    return this.sendMailForm.controls;

  } 
   sendMail(){
    for(let i = 0 ; i < this.commentData.length ; i++){
        this.selectedComment.push(this.commentData[i].comment);
    }

    let idComment = this.selectedComment;
    console.log(idComment);


    for(let i =0 ; i <this.assign.length ; i ++) {
     //   alert(this.assign[i].filename);
      this.selectedFeaturesFile.push(this.assign[i].filename);
      
    }
    
    let fileDetails = this.selectedFeaturesFile;
    console.log("This is the component.ts  " + fileDetails);
    
    this.submitted = true;
    this.loading = true;
    this.mailUrl = this.f.email.value;
    let valueMail = {

      "mailName" : this.f.email.value , "assignUser" :this.assign[0].assignUser , "id" : this.assign[0].id , "createdDate" : this.assign[0].createdDate , "createdTime" : this.assign[0].createdTime , "jobDescription" : this.assign[0].jobDescription , "jobName" : this.assign[0].jobname , "currentUser":this.assign[0].username

    }

    let currentDetails = {
      valueMail , fileDetails , idComment
    }

    if(this.sendMailForm.valid){
    this.authenticationService.usersendEmail(currentDetails).
    subscribe(
      data => {
        let res:any = data;
        console.log("Mail was Send");
      },
      error => {
        console.log(error);
          this.error = error;
          this.loading = false;
      });
      alert("Your mail is successfully send");
      this.submitted = false;
      this.sendMailForm.reset();
      this.selectedFeaturesFile.length = 0;
    }


   }














  download ($event, data) {

    const file = data.filename;
    const id = data.id

     //alert(id);
    
    window.open(config.PAPYRUS + "/uplds/download/"+id+"/"+file);
   
  }

  changeTemplate($event , data) {
  
      
  

    const Template = $event.target.value;
    const uniqueId = data.uniqueId
data.status = 'Ready';
data.itemtemp = Template
this.currentCompleter = data.status

    //alert("this is the changeTemplate" + Template + uniqueId);

    this.JobService.updateTemplateStatus(Template, data.uniqueId)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.error = error;
        this.loading = false;
      });

      //Update the status

      let status = 'Ready';
      //alert("this is the changeStatus" + status + uniqueId);

      this.JobService.updateStatus(status, data.uniqueId)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }


  receiveComment($event) {
    //alert("here is")
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

  // commnetSubmit() {


  // }
  refreshPage(data) {
   // alert(data)
    
    
    location.reload();
    this.ifClick = true;
    data.status = 'Completed'
    

  
  }

}
