import { Component, OnInit } from '@angular/core';
import { Router, Resolve, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

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
    private authenticationService: AuthenticationService) { }

  ngOnInit(){
        
    this.authenticationService.logout();


    };
}
