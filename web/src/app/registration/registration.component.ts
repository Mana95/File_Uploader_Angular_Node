import { Role } from './../_models/role';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';




@Component({

  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']

})   

export class RegistrationComponent implements OnInit {

user: User;

  //web Cam
public allowCameraSwitch = true;
public showWebcam = false;

public facingMode: string = 'environment';
public deviceId: string;

  // latest snapshot
  public webcamImage: WebcamImage = null;

// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();


  registerFrom: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  returnUrl: string;
  currentUser: User;

  AssignUser: any;
  
  constructor(
    
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
    this.registerFrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailname: ['',Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
     return this.registerFrom.controls;
    }   

  get username() {

    
     return this.registerFrom.controls.username ;

    }

    public toggleWebcam(): void {
      this.showWebcam = !this.showWebcam;
    }
  
    public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }



  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  getRole (event) {
   
    this.AssignUser = event.target.value;
  }
  onSubmit() {


    if(this.registerFrom.valid){
     // alert('User form is valid!!')

    } else {
     // alert('User form is not valid!! Make sure to fill the required Field');
    }
    console.log('hellow world');
    this.submitted = true;


  this.loading = true;
        // tslint:disable-next-line:max-line-length
      let  userParam = {

          "username": this.f.username.value, "password" : this.f.password.value, "firstName" : this.f.firstname.value, "lastName": this.f.lastname.value, "role":  this.AssignUser, "email": this.f.emailname.value

        }
        this.authenticationService.register(userParam)
        .subscribe(
                data => {
                  console.log(data);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
                
              

             if(this.registerFrom.valid){
               this.submitted = false;
                this.registerFrom.reset();
              }
              // this.submitted = false;
              //     //add product
              //     this.registerFrom.reset();

                
                
                

  }
}
