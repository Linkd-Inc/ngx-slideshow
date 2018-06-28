import {Component, ViewChild} from '@angular/core';
import {NgxSlideshowComponent} from 'ngx-slideshow';

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
          <div class="circleDot" *ngFor="let number of [1,2,3,4,5,6,7,8,9]" [class.active]="slideshow.index === number"
               (click)="slideshow.goTo(number)"></div>
        </div>
        <ngx-slideshow #slideshow [cards]="2" [padding]="'10px'" [resizeViewport]="false">
          <ng-template ngx-slideshow-card *ngFor="let a of [1,2,3,4,5,6,7,8,9]">
            <div class="card"></div>
          </ng-template>
        </ngx-slideshow>
    </div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  @ViewChild('slideshow') slideshow: NgxSlideshowComponent;
  index = 0;
  right() {
    this.slideshow.right();
    this.index++;
  }
  left() {
    this.slideshow.left();
    this.index--;
  }
}
