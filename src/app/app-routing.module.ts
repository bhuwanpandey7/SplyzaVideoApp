import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoRoutingModule } from '../components/video-routing.module';

const routes: Routes = [
  {
    path: 'videos',
    loadChildren: () => import('../components/video.module').then((m) => m.VideoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), VideoRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
