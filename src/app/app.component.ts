import {Component, ViewChild} from '@angular/core';
import {NgxSlideshowComponent} from '../../projects/ngx-slideshow/src/public-api';

@Component({
  selector: 'app-root',
  template: `
    <div class="getting-started">
      <div class="slideshow">
        <div class="arrow left">
          <button mat-icon-button (click)="left()"><</button>
        </div>
        <div class="arrow right">
          <button (click)="right()">></button>
        </div>
        <div class="circles">
          <div class="circleDot" *ngFor="let number of numList"
               [class.active]="(slideshow.index | slideshowIndex : numList.length) === number"
               (click)="slideshow.goTo(number)"></div>
        </div>
        <ngx-slideshow #slideshow [cards]="2" [padding]="'10px'" [resizeViewport]="false">
          <ng-template ngx-slideshow-card *ngFor="let a of numList; let index = index">
            <div class="card">{{index}}</div>
          </ng-template>
        </ngx-slideshow>
      </div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  @ViewChild('slideshow', {static: false}) slideshow: NgxSlideshowComponent;
  numList = Array.from(Array(10).keys());

  right() {
    this.slideshow.right();
  }

  left() {
    this.slideshow.left();
  }
}
