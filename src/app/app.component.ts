import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SplyzaVideoApp';
  loggedInUsername: string = ''; // Initialize with a default or empty value

  onLoggedInUsernameChange(username: string) {
    this.loggedInUsername = username;
  }
}
