import { Component, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { SalesforceService } from '../salesforce.service';

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
  salesForceUrl = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9i1HRpGLXp.p_zzAqY14i73050t21TX8NbRVI3Ks0GY4wfBX459fKOxzTZPx3isWUN_pSUxyxxkNs67wR&redirect_uri=http://localhost:4200/dashboard'
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private salesforceService: SalesforceService
    ) { }

  ngOnInit() {
    
    //reset login status
        
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

  loginSF() {

    console.log('Clicked!');
    this.loading = true;
    window.location.href = this.salesForceUrl; 
  }

}
