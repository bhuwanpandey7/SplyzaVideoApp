import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoDetail } from '../../../shared/models/video-detail.interface';

@Component({
  selector: 'app-video-listview',
  templateUrl: './video-listview.component.html',
  styleUrls: ['./video-listview.component.scss'],
})
export class VideoListViewComponent implements OnInit {
  @Input()
  video!: VideoDetail;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getVideoDetails(video: any) {
    this.router.navigate(['/videos', video.id]);
  }
}
