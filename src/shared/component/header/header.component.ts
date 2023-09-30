import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName:  String = '';
  userLogo: String = '';
  userInfoSubscription: Subscription | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userInfoSubscription = this.userService.loggedInUsername$.subscribe((user) => {
      this.userName = user.name;
      this.userLogo = user.pictureUrl
    });
  }

  ngOnDestroy() {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

}
