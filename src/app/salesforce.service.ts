import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SalesforceService {

  

  constructor(private http: Http) { }

  loginSF(sfURL): Observable<any> {

    return this.http.post(sfURL, {})
      .map(data => data.json());    
    
  }

}
