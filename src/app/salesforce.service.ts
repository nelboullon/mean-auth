import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SalesforceService {

  private oauth2endpoint;
  private clientId = '3MVG9i1HRpGLXp.p_zzAqY14i73050t21TX8NbRVI3Ks0GY4wfBX459fKOxzTZPx3isWUN_pSUxyxxkNs67wR'
  private clientSecret = '3751390069198698753'
  private redirectUri = 'http://localhost:4200/oauth2callback'
  private code;

  constructor(
    private http: Http,
    private router: Router) { }

  signin(): void {

    localStorage.setItem('authMethod', 'Salesforce');

    this.oauth2endpoint = 'https://login.salesforce.com/services/oauth2/authorize';

    //create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', this.oauth2endpoint);

    //set params
    let params = {
      'response_type': 'code',
      'client_id': this.clientId,
      'redirect_uri': this.redirectUri
    }

    //add form parameters as hidden input values
    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  login(url): void {

    this.oauth2endpoint = 'https://login.salesforce.com/services/oauth2/token'

    if (localStorage.getItem('code')) {
      
      

    } else {

      let result = {};

      let query = url.substr(16);

      query.split('&').forEach((part) => {

          let item = part.split('=');
          result[item[0]] = decodeURIComponent(item[1]);

          this.code = result['code'];
          
          localStorage.setItem('code', this.code);
      
      });

    }

  let grantType = 'authorization_code'
  
  let xhr = new XMLHttpRequest;

  xhr.onreadystatechange = function() {
    if (this.status == 200) {
      console.log(JSON.parse(this.responseText))
    }else {
      
    }
  }

  xhr.open('POST', this.oauth2endpoint
            +'?code='+this.code
            +'&grant_type='+grantType
            +'&client_id='+this.clientId
            +'&client_secret='+this.clientSecret
            +'&redirect_uri='+this.redirectUri
            +'&format=json')
  xhr.send()

}
}

