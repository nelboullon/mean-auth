import { Component, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { SalesforceService } from '../salesforce.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private salesforceService: SalesforceService) { }

  ngOnInit(){
        
    this.authenticationService.logout();

    if (this.activatedRoute.snapshot.queryParams['code']) {

      let sfCode = this.activatedRoute.snapshot.queryParams['code'];
      let sfURL = 'https://login.salesforce.com/services/oauth2/token?code='+sfCode+'&grant_type=authorization_code&client_id=3MVG9i1HRpGLXp.p_zzAqY14i73050t21TX8NbRVI3Ks0GY4wfBX459fKOxzTZPx3isWUN_pSUxyxxkNs67wR&client_secret=3751390069198698753&redirect_uri=http://localhost:4200/dashboard';
  
      this.salesforceService.loginSF(sfURL)
        .subscribe(result => {

          console.log(result);

        }); 
    }

    };
}
