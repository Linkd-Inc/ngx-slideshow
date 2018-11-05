import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxSlideshowModule} from 'ngx-slideshow';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSlideshowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
