import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoModule } from '../components/video.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    VideoModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
