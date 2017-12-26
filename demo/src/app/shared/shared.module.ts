import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import {NgxSlideshowComponent} from '../../../../src';

@NgModule({
    imports: [RouterModule, NgbCollapseModule.forRoot() ],
    exports: [HeaderComponent, FooterComponent, ContentWrapperComponent, NgxSlideshowComponent],
    declarations: [HeaderComponent, FooterComponent, ContentWrapperComponent, NgxSlideshowComponent],
    providers: [],
})
export class AppSharedModule { }
