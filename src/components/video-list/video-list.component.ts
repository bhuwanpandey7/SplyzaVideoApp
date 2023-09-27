import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiService } from '../../shared/service/video.service';
import { UserService } from '../../shared/service/user.service';
import { ToggleTypes } from 'src/shared/enums/view-toggle-types.enum';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  videos: any[] = [];
  userName: String = '';
  currentView: String = ToggleTypes.grid; // Initialize as list view by default
  userLogo: String = '';

  @Output() loggedInUsernameChange = new EventEmitter<string>();
  $destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private videoService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.loggedInUsername$.subscribe((user) => {
      this.userName = user.name;
      this.userLogo = user.pictureUrl;
    });

    this.videoService
      .getVideos()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((videos) => {
        // clone and set later
        this.videos = videos;
      });
  }

  toggleView(view: ToggleTypes | String) {
    this.currentView = view; // Update the current view (grid or list)
  }

  ngOnDestroy() {
    this.$destroyed.unsubscribe();
  }
}
