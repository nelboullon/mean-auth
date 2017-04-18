import { Component, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { GoogleService } from '../google.service';
import { SalesforceService } from '../salesforce.service';
import { SfService } from '../sf.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private googleService: GoogleService,
    private salesforceService: SalesforceService,
    private sfService: SfService
    ) { }

  ngOnInit() {
    
    //reset login status
    this.authenticationService.logout();
        
  }

  login() {

    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
    .subscribe(result => {
      if (result === true) {
        //login successful
        this.router.navigate(['/']);
      } else {
        //login failed
        this.error = 'Email or password is incorrect';
        this.loading = false;          
      }  

    });

    
  }

  signInGoogle() {

    this.googleService.signin();

  }

  signInSalesforce() {

    this.sfService.signin();

  }
}
