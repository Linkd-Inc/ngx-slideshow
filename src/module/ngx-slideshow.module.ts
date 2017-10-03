import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgxSlideshowComponent} from './component/ngx-slideshow.component';

// Export module's public API
export {NgxSlideshowComponent} from './component/ngx-slideshow.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NgxSlideshowComponent],
  declarations: [NgxSlideshowComponent]
})
export class NgxSlideshowModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSlideshowModule,
      providers: []
    };
  }
}
