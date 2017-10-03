import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgSlideshowComponent} from './component/ng-slideshow.component';

// Export module's public API
export {NgSlideshowComponent} from './component/ng-slideshow.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NgSlideshowComponent],
  declarations: [NgSlideshowComponent]
})
export class NgSlideshowModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgSlideshowModule,
      providers: []
    };
  }
}
