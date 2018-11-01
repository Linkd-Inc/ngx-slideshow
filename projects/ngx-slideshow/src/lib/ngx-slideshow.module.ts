import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxSlideshowComponent} from './ngx-slideshow.component';
import {WrapSlicePipe} from './wrap-slice.pipe';
import {NgxSlideshowCardDirective} from './ngx-slideshow-card.directive';
import {SlideshowIndexPipe} from './slideshowIndex.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxSlideshowComponent,
    WrapSlicePipe,
    NgxSlideshowCardDirective,
    SlideshowIndexPipe
  ],
  exports: [
    NgxSlideshowComponent,
    WrapSlicePipe,
    NgxSlideshowCardDirective,
    SlideshowIndexPipe
  ]
})
export class NgxSlideshowModule { }
