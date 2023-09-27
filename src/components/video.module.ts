import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { FormsModule } from '@angular/forms';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoListViewComponent } from './video-list/video-listview/video-listview.component';
import { VideoGridComponent } from './video-list/video-grid/video-grid.component';
import { ViewToggleComponent } from './video-list/view-toggle/view-toggle.component';

@NgModule({
  declarations: [
    VideoListComponent,
    VideoDetailsComponent,
    VideoListViewComponent,
    VideoGridComponent,
    ViewToggleComponent,
  ],
  imports: [CommonModule, VideoRoutingModule, FormsModule],
})
export class VideoModule {}
