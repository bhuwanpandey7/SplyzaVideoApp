import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
