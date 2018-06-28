import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-slideshow-card]' })
export class NgxSlideshowCardDirective {
  constructor(public template: TemplateRef<any>) { }
}
