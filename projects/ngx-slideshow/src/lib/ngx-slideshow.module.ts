import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgxSlideshowComponent} from './ngx-slideshow.component';
import {WrapSlicePipe} from './wrap-slice.pipe';
import {NgxSlideshowCardDirective} from './ngx-slideshow-card.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NgxSlideshowComponent,
    WrapSlicePipe,
    NgxSlideshowCardDirective
  ],
  exports: [
    NgxSlideshowComponent,
    WrapSlicePipe,
    NgxSlideshowCardDirective
  ]
})
export class NgxSlideshowModule { }
