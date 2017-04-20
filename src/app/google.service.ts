import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class GoogleService {

  private oauth2Endpoint;
  private accessToken;

  constructor(
    private http: Http) { }


  signin(): void {

    localStorage.setItem('authMethod', 'Google');

    this.oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    //create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); //send as a GET request.
    form.setAttribute('action', this.oauth2Endpoint);

    //set params
    let params = {
    'client_id': '957510077101-a4l5i9k6ctjlkg1up6lf9per4hp68li6.apps.googleusercontent.com',
    'redirect_uri': 'http://localhost:4200/oauth2callback',
    'response_type': 'token',
    'scope': 'email profile',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'}

    //add form parameters as hidden input values
    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    //add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();

  }


  login(url): void {

    this.oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

    let result = {};

    let query = url.substr(16);

    query.split('&').forEach((part) => {

      let item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);

      this.accessToken = result['access_token'];

      localStorage.setItem('access_token', this.accessToken);

    })

    //create <form> element to submit parameters to OAuth 2.0 endpoint    
    let xhr = new XMLHttpRequest;
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          let email = JSON.parse(this.responseText).email
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: localStorage.getItem('access_token') }))
          localStorage.removeItem('access_token')        

       } 
      }
    


    xhr.open('GET', this.oauth2Endpoint+'?access_token='+this.accessToken);
    xhr.send()

    


  }
}
