import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service'; // Import your API service
import { ApiService } from 'src/shared/service/video.service';
import { StarVideoReaction } from '../../shared/models/star-reaction.interface';
import { VideoDetail } from '../../shared/models/video-detail.interface';
import { VideoReactionType } from '../../shared/enums/video-reactionType.enum';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
// import { AuthService } from '../services/auth.service'; // Import your authentication service

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit, OnDestroy {
  video!: VideoDetail; // Store video details
  reactions: any[] = []; // Store reactions
  isVideoOwner: boolean = false;
  editedTitle: string = '';
  isVideoPlaying: boolean = false;

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef;
  $destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: ApiService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const videoId = this.route.snapshot.params['id'];
    this.spinner.show();
    this.videoService
      .getVideoDetails(videoId)
      .pipe(
        takeUntil(this.$destroyed),
        // create separate error handling service
        catchError(() => {
          this.spinner.hide();
          return throwError(() => 'Api Error');
        })
      )
      .subscribe((video) => {
        this.video = video;
        this.spinner.hide();
      });

    // Retrieve reactions using the API service
    this.getReactions(videoId);
  }

  private getReactions(videoId: any) {
    this.videoService
      .getReactions(videoId)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((reactions) => {
        this.reactions = reactions;
      });
  }

  saveTitle(newTitle: any): void {
    this.spinner.show();
    // Update the video title using the API service
    this.editedTitle = newTitle;
    this.videoService
      .updateVideoTitle(this.video.id, this.editedTitle)
      .pipe(
        // create separate error handling service
        catchError(() => {
          this.spinner.hide();
          return throwError(() => 'Api Error');
        })
      )
      .subscribe(() => {
        this.video.title = this.editedTitle;
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      });
  }

  addReaction(type: string): void {
    const timestamp = this.getCurrentVideoTime();
    const ReactionTypes: any = {
      Star: () => {
        // star payload
        const starReaction: StarVideoReaction = {
          videoId: this.video.id,
          type: VideoReactionType.star,
          timeframe: timestamp,
        };
        this.videoService
          .addReaction(this.video.id, starReaction)
          .subscribe((addedReaction) => {
            this.reactions.push(addedReaction);
            this.getReactions(this.video.id);
          });
      },
      Snapshot: () => {
        const imageBase64Data = this.captureSnapshotBase64();
        // snapshot payload
        const snapshotReaction = {
          videoId: this.video.id,
          type: 'snapshot',
          timeframe: timestamp,
          dataUri: imageBase64Data,
        };
        // service to get reactions
        this.videoService
          .addReaction(this.video.id, snapshotReaction)
          .subscribe((addedReaction) => {
            this.reactions.push(addedReaction);
            this.getReactions(this.video.id);
          });
      },
    };
    ReactionTypes[type]();
  }

  goToVideoList(): void {
    this.router.navigate(['/videos']);
  }

  goToReactionTimestamp(timestamp: number): void {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = timestamp;
    video.pause();
    if (video) {
      video.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private getCurrentVideoTime(): number {
    const video = this.videoPlayer.nativeElement;
    return video.currentTime;
  }

  // Not working while playing need to check
  private captureSnapshotBase64(): string {
    const video = this.videoPlayer.nativeElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Check if the video is ready to capture a snapshot
    if (video.readyState >= 4) {
      video.pause();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Create a new Image element
      const image = new Image();

      // Set the crossorigin attribute to "anonymous" for the Image element
      image.crossOrigin = 'anonymous'; // This allows tainting - need to see

      // Set the src of the Image element to the snapshot data URI
      image.src = canvas.toDataURL('image/png');
      canvas.remove();
      return image.src;
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    this.$destroyed.unsubscribe();
  }
}
