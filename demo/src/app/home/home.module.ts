import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgxSlideshowModule  } from 'ngx-slideshow';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        NgxSlideshowModule.forRoot(),
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
