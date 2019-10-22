import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../config/config.js';
import { Job } from '../_models';


@Injectable({ providedIn: 'root' })

export class JobService {

constructor(private http: HttpClient) {

}

    getAllJobs() {
   return this.http.get(config.PAPYRUS+'/jobs/job');


}
downloadFile(file: String){

  return this.http.get(config.PAPYRUS+`/uplds/download/${file}`);

}



updateAssignUser(role: string, id: number): Observable<Job> {

  var jobObj = {"id":id , "assignUser":role}
  return this.http.post<Job>(config.PAPYRUS+`/jobs/jobAssignUser`, jobObj)


}

updateTemplateStatus(Template: string, uniqueId: number): Observable<Job> {

  var jobObj = {"uniqueId":uniqueId , "itemtemp":Template}
  // return this.http.post<any>(`http://localhost:4200/${role}`);
  // alert("This is the jobservice.ts" + JSON.stringify(jobObj));

  return this.http.post<Job>(config.PAPYRUS+`/jobs/jobUpdateTemp`, jobObj)


}

updateStatus(status: string, uniqueId: number): Observable<Job> {

  var jobObj = {"uniqueId":uniqueId , "status":status}
  console.log(status);

  //alert("This is the jobservice.ts status" + JSON.stringify(jobObj));

  return this.http.post<Job>(config.PAPYRUS+`/jobs/jobUpdateStatus`, jobObj)

}

uploadId(uniqueId: number): Observable<Job> {

  var jobObj = {"uniqueId":uniqueId}
  //alert("sdsadsada"+ JSON.stringify(jobObj));

  //alert("This is the jobservice.ts status" + JSON.stringify(jobObj));

  return this.http.post<Job>(config.PAPYRUS+`/uploadId/`, jobObj)

}


getByIdComments(id: number): Observable<any> {
//alert(id)
  console.log("This is the job service" +  id);
 
    return this.http.get(config.PAPYRUS+`/comments/jobById/${id}`);
  }



getById(id: number): Observable<Job> {

  console.log("This is the job service" +  id);
 
    return this.http.get<Job>(config.PAPYRUS+`/uplds/jobById/${id}`);
  }

  //New method  for job
  jobupload(jobs): Observable<any> {
    console.log ("Upload method API ekata call wena thena");
    console.log (JSON.stringify(jobs));
    //methnin data tika yanne na
    return this.http.post<any>(config.PAPYRUS+`/jobs/jobinsert`, jobs)
    .pipe(map(user => {
      // register successfull if there is a jwt token in the response
      return user;
    }));
 }





 

 insertCommentDetails(commentData): Observable<any> {
  return this.http.post<any>(config.PAPYRUS+`/comments/insertComment`, commentData)
  .pipe(map(user => {
    // register successfull if there is a jwt token in the response
    return user;
  }));
 }

 getAllUsers() {
  return this.http.get(config.PAPYRUS+'/comments/allComments');
 }


}

