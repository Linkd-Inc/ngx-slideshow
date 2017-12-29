import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GettingStartedComponent} from './getting-started.component';
import {GettingStartedRoutingModule} from './getting-started-routing.module';
import {NgxSlideshowModule} from 'ngx-slideshow';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    NgxSlideshowModule.forRoot(),
    MatIconModule,
    MatButtonModule
  ],
  declarations: [GettingStartedComponent],
})
export class GettingStartedModule {
}
