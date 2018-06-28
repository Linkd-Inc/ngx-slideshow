import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  HostListener,
  QueryList,
  ContentChildren,
  ElementRef, ViewChildren
} from '@angular/core';
import {NgxSlideshowCardDirective} from './ngx-slideshow-card.directive';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ngx-slideshow',
  templateUrl: './ngx-slideshow.component.html',
  styleUrls: ['./ngx-slideshow.component.scss'],
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({width: '0'}),
      animate('300ms ease-in-out', style({width: '*'}))
    ]),
    transition(':leave', [
      style({width: '*'}),
      animate('300ms ease-in-out', style({width: '0'}))
    ]),
  ])]
})
export class NgxSlideshowComponent implements AfterViewInit, OnChanges {
  @ViewChildren('cardItem') private cardItems: QueryList<ElementRef>;
  @ContentChildren(NgxSlideshowCardDirective) cardList: QueryList<NgxSlideshowCardDirective>;
  @Input() cards = 1;
  @Input() padding = '14px';
  @Input() cardSize;
  @Input() resizeViewport = true;
  @Input() unit = 'px';

  // Set initial index
  index = 0;
  min = -1;

  // These will be generated with ngAfterViewInit, as they rely on the number of cards loaded into the carousel
  trueViewportSize: string;
  trueCardSize: string;
  truePaddingSize: string;
  pixelCardSize: string;

  setSideStyle: {width?: string} = {};

  // These will be used in regex searches later
  private findNumbers = new RegExp(/([0-9]+(?:[.][0-9]+)?)(?![.%\w])/g);

  // To use with HammerJS
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor() {
  }

  ngAfterViewInit(): void {
    this.__onResize();
  }

  ngOnChanges(): void {
    this.__onResize();
  }

  right(): void {
    this.rightBy(1);
  }

  left(): void {
    this.leftBy(1);
  }

  goTo(i: number): void {
    this.index = i;
  }

  leftBy(i: number): void {
    this.goTo(this.index - i);
  }

  rightBy(i: number): void {
    this.goTo(this.index + i);
  }

  // HammerJS Example. Not sure if I like the syntax; May change
  swipe(action = this.SWIPE_ACTION.RIGHT): void {
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.left();
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      this.right();
    }
  }

  private convertNumberToUnit(unitless: string) {
    return `${unitless}${this.unit}`;
  }

  setMarginSize = (padding) => `0 calc(${padding} / 2)`;

  @HostListener('window:resize', [])
  __onResize(): void {
    if (!this.cardSize && this.cards) {
      this.cardSize = `${100 / this.cards}%`;
    } else if (!(this.cardSize) && !(this.cards)) {
      throw Error('You cannot have both `cardSize` and `card` left unset');
    }

    if (this.cardSize.includes('%') && this.resizeViewport) {
      throw Error('You cannot use percentages with `resizeViewport`');
    } else if (this.cardSize.includes('%') && !this.resizeViewport) {
      // TODO: Add tests for all unit types such as this
      this.trueCardSize = this.cardSize
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
    } else {
      this.trueCardSize = this.cardSize
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
    }

    if (this.padding.includes('%') && this.resizeViewport) {
      throw Error('You cannot use percentages with `resizeViewport`');
    } else if (this.padding.includes('%') && !this.resizeViewport) {
      this.truePaddingSize = this.setMarginSize(this.padding
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this)));
    } else {
      this.truePaddingSize = this.setMarginSize(this.padding
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this)));
    }

    const fullCardSize = `calc(${this.trueCardSize} + ${this.truePaddingSize})`;
    this.trueViewportSize = `calc(${fullCardSize} * ${this.cards})`;
    if (this.cardItems && this.cardItems.first) {
      this.pixelCardSize = `${this.cardItems.first.nativeElement.clientWidth}px`;
    }
  }
}
