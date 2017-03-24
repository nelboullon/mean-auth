import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  localhost: String = 'localhost';
  port: String = '5000';

  public token: string;

  private authenticateUrl = 'http://'+this.localhost+':'+this.port+'/api/authenticate';

  constructor(private http: Http) { 

    //Set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  login(email: string, password: string): Observable<boolean> {

    return this.http.post(this.authenticateUrl, { email: email, password: password })
      .map((response: Response) => {

        //login succesful if there's a jwt token in the response
        let token = response.json() && response.json().token;

        if (token) {

          //set token property
          this.token = token;

          //store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

          //return true to indicate successful login
          return true;

        } else {

          //return false to indicate failed login
          return false;

        }

      });

  }

  logout(): void {

    //clear token remove user from local storage to log user logout
    this.token = null;
    localStorage.removeItem('currentUser');

  }

}
