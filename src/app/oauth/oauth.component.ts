import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../authentication.service';
import { GoogleService } from '../google.service';
import { SalesforceService } from '../salesforce.service';
import { SfService } from '../sf.service';


@Component({
  moduleId: module.id,
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  private authMethod = localStorage.getItem('authMethod');
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService,
    private googleService: GoogleService,
    private salesforceService: SalesforceService,
    private sfService : SfService) { }

  ngOnInit() {

    

    if (this.authMethod) {
      
      let url = this.router.url;
      
      if (this.authMethod === 'Google') {

        this.googleService.login(url)
        this.validateCurrentUser()

      }else if(this.authMethod === 'Salesforce') {

        localStorage.removeItem('id')
        this.sfService.login(url)
          .subscribe( response => {

            console.log(response)
            
          })
       
      }
    }
  }

  validateCurrentUser() {

    if (localStorage.getItem('currentUser')){

        this.router.navigate(['/'])

      }else{

        this.router.navigate(['/login'])

      } 
        

  }

}
