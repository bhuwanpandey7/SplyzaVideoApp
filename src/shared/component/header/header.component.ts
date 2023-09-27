import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName:  String = '';
  userLogo: String = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUsername$.subscribe((user) => {
      this.userName = user.name;
      this.userLogo = user.pictureUrl
    });
  }

}
