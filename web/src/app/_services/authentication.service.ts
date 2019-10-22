import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../config/config.js';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

   login(username: string, password: string): Observable<any> {
     console.log(username + password);
    return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successfull if there is a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
   }

   register(userParam): Observable<any> {
//methin thamai call karala thiyenne back end ekata 
      console.log (userParam );
      return this.http.post<any>(config.PAPYRUS+`/users/register`, userParam)
      .pipe(map(user => {
        // register successfull if there is a jwt token in the response
        return user;
      }));
   }



   usersendEmail(currentDetails): Observable<any> {
     console.log(currentDetails)
     return this.http.post(config.PAPYRUS+`/users/sendMail`,currentDetails)
     .pipe(map(user => {
      
      return user;
    }));
   }

   upload(userParam): Observable<any> {
    console.log ("Upload method API ekata call wena thena");
    console.log (JSON.stringify(userParam));
    //methnin data tika yanne na
    return this.http.post<any>(config.PAPYRUS+`/uplds/upload`, userParam)
    .pipe(map(user => {
      // register successfull if there is a jwt token in the response
      return user;
    }));
 }

 view(username: string, password: string): Observable<any> {
  console.log(username + password);
 return this.http.post<any>(config.PAPYRUS+`/users/authenticate`, { username, password })
   .pipe(map(user => {
     // login successfull if there is a jwt token in the response
     return user; 
   }));
}

getAllUsers() {
  
  return this.http.get(config.PAPYRUS+`/users/u`);

}




   logout(): void {
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }
}
