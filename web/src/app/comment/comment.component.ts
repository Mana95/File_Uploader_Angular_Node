import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from './../_models/user';
import * as moment from 'moment';
import { JobService } from '../_services';
import { AuthenticationService } from '../_services';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  loading = false;
  currentUser: User;
  error = '';
  currentDate: any;
  currentTime: any;
  displayReplyFrom = false;
  uniqueId: any;

  commentData : any;

  @Output() usercomment = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private JobService: JobService,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    ) { 

      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
     
  });


    this.createForm();
    this.uniqueId = (this.route.snapshot.paramMap.get('jobid'));
  //  alert("This is the Id"+this.uniqueId);
  //   alert("This is the comment" + this.currentUser.username)
  this.JobService.getByIdComments(this.uniqueId)
  .subscribe(
    data => {
     this.commentData = data
      console.log(data);
    }
  );



  }

  get f() {
    return this.commentForm.controls;
   }   

   

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
    
  }



  onSubmit() {
    this.submitted = true;
    const comStat = this.f.comment.value
   
    // stop here if form is invalid
    this.currentTime = moment().format('LT');
    this.currentDate = moment().subtract(10, 'days').calendar();
    let Time = this.currentTime
    
    if (this.commentForm.invalid) {
      return false;
    }
     else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        currentTime : Time,
        currentUser : this.currentUser.username,
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: []
      });
      this.usercomment.emit(this.commentInfo);
    }
    let commentData = {

      "id": this.uniqueId, "username": this.currentUser.username , "comment": this.f.comment.value, "createDate": this.currentDate, "createdTime": this.currentTime

    }

    this.JobService.insertCommentDetails(commentData).subscribe(
      data => {
        console.log("subcribe" + JSON.stringify(data));
      },
      error => {
        this.error = error;
        this.loading = false;
      });   
      if (this.commentForm.valid) {

        this.submitted = false;
        this.commentForm.reset();

      } 
      else {

        this.submitted = true;

      }

      this.displayReplyFrom = true;


  }
 
}
