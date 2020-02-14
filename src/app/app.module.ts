import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {NgxSlideshowModule} from '../../projects/ngx-slideshow/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSlideshowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
