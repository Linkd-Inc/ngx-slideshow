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
          <div class="circleDot" *ngFor="let number of numList" [class.active]="slideshow.index === number"
               (click)="slideshow.goTo(number)"></div>
        </div>
        <ngx-slideshow #slideshow [cards]="2" [padding]="'10px'" [resizeViewport]="false">
          <ng-template ngx-slideshow-card *ngFor="let a of numList">
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
  numList = Array.from(Array(10).keys());

  right() {
    this.slideshow.right();
  }

  left() {
    this.slideshow.left();
  }
}
