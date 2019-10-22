import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {


  currentUser: User;
  userFromApi: User;

  images: any = [];
  allfiles: any = [];
  isVisible = false;
  status1 = 'Pending';
  options: any;


  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  //  fileUpload(event) {
  //    console.log(event);
  //     const files = event.target.files;

  //     if (files) {
  //       console.log(files);
  //           for (let i = 0; i < files.length; i++) {
  //               const x = i;

  //             const excel = {
  //               id: '',
  //               name: '',
  //               type: this.allfiles,
  //               size: '',
  //               url: '',
  //               user: this.currentUser.username,
  //               status: '',

  //             };

  //             this.allfiles.push(files[i]);
  //             excel.name = files[i].name;

  //             excel.size = files[i].size;
  //             const reader = new FileReader();
  //             reader.onload = (filedata) => {
  //               excel.url = reader.result + '';
  //               this.images.push(excel);
  //             };

  //             reader.readAsDataURL(files[i]);
  //             console.log(excel.url);
  //             console.log(excel.url);
  //             console.log(JSON.stringify(excel));
  //             this.options = excel;


  //           console.log(JSON.stringify(excel));
  //           }
  //     }

  //     event.srcElement.value = null;



  //  }

   deleteRow(excel: any) {
    const index = this.images.indexOf(excel);
    this.images.splice(index, 1);
    this.allfiles.splice(index, 1);
}
// 4.50pm code kare 
    // tslint:disable-next-line:member-ordering
 

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;

    });
  }
}

