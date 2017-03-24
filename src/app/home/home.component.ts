import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(private UserService: UserService) { }

  ngOnInit() {

    //get users from secure api end point
    this.UserService.getUsers()
        .subscribe(users => {
          this.users = users;
        });
  }

}
