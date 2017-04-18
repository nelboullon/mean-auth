import { Injectable } from '@angular/core';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Injectable()
export class SfService {

  private oauth2endpoint
  private clientId = '3MVG9i1HRpGLXp.p_zzAqY14i73050t21TX8NbRVI3Ks0GY4wfBX459fKOxzTZPx3isWUN_pSUxyxxkNs67wR'
  private redirectUri = 'http://localhost:4200/oauth2callback'
  private id
  private accessToken

  constructor(
    private http: Http,
    private router: Router) { }

  signin(): void {

    localStorage.setItem('authMethod', 'Salesforce')

    this.oauth2endpoint = 'http://login.salesforce.com/services/oauth2/authorize'

    //create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form')
    form.setAttribute('method', 'POST')
    form.setAttribute('action', this.oauth2endpoint)

    //set params 
    let params = {
      'response_type' : 'token',
      'client_id' : this.clientId,
      'redirect_uri' : this.redirectUri,

    }

    //add form parameters as hidden input values
    for (let p in params) {
      let input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
    }

    document.body.appendChild(form)
    form.submit()
  }

  login(url): Observable<Response> {

    if (localStorage.getItem('id')) {

    }else{

      let result = {}

      let query = url.substr(16);

      query.split('&').forEach((part) => {

        let item = part.split('=')
        result[item[0]] = decodeURIComponent(item[1])

        this.id = decodeURIComponent(result['id'])
        this.accessToken = result['access_token']

        localStorage.setItem('id', this.id)

        this.oauth2endpoint = this.id

      })

    }

    


    let headers = new Headers({ 'Authorization': 'Bearer '+this.accessToken });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.oauth2endpoint, options)
      .map((response : Response) => {

        return response

      })

    

  }


}
