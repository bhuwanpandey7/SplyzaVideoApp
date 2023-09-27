import { Component, Input, OnInit } from '@angular/core';
import { VideoDetail } from '../../../shared/models/video-detail.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
})
export class VideoGridComponent implements OnInit {
  @Input()
  video!: VideoDetail;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getVideoDetails(video: any) {
    this.router.navigate(['/videos', video.id]);
  }
}
