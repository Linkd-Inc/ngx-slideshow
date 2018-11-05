import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  HostListener,
  QueryList,
  ContentChildren,
  ElementRef,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import {NgxSlideshowCardDirective} from './ngx-slideshow-card.directive';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

@Component({
  selector: 'ngx-slideshow',
  templateUrl: './ngx-slideshow.component.html',
  styleUrls: ['./ngx-slideshow.component.scss'],
  animations: [trigger('shrinkEnterExit', [
    transition(':enter', [
      style({width: '0', margin: '0'}),
      animate('300ms ease-in-out', style({width: '*', margin: '*'}))
    ]),
    transition(':leave', [
      style({width: '*', margin: '*'}),
      animate('300ms ease-in-out', style({width: '0', margin: '0'}))
    ]),
  ])]
})
export class NgxSlideshowComponent implements AfterViewInit, OnChanges {
  @ContentChildren(NgxSlideshowCardDirective) cardList: QueryList<NgxSlideshowCardDirective>;
  @ViewChildren('cardItem') private cardItems: QueryList<ElementRef>;
  @Input() cards = 1;
  @Input() padding = '14px';
  @Input() cardSize;
  @Input() resizeViewport = true;
  @Input() unit = 'px';
  @Input() disableWrap = false;
  // Set initial index
  index = 0;
  // These will be generated with ngAfterViewInit, as they rely on the number of cards loaded into the carousel
  trueViewportSize: SafeValue;
  trueCardSize: SafeValue;
  truePaddingSize: SafeValue;
  trustedPaddingSize: SafeValue;
  pixelCardSize: number;

  // These will be used in regex searches later
  private findNumbers = new RegExp(/([0-9]+(?:[.][0-9]+)?)(?![.%\w])/g);
  // To use with HammerJS
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};
  setMarginSize = (padding, divideNum = 2) => `0 calc(${padding} / ${divideNum})`;

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {
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

  @HostListener('window:resize', [])
  __onResize(): void {
    let paddingSize;
    if (this.padding.includes('%') && this.resizeViewport) {
      throw Error('You cannot use percentages with `resizeViewport`');
    } else {
      paddingSize = this.padding
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
      this.truePaddingSize = this.sanitizer.bypassSecurityTrustStyle(this.setMarginSize(paddingSize));
      this.trustedPaddingSize = this.sanitizer.bypassSecurityTrustStyle(paddingSize);
    }

    if (!this.cardSize && this.cards) {
      this.cardSize = `calc(${100 / this.cards}% - ${paddingSize})`;
    } else if (!(this.cardSize) && !(this.cards)) {
      throw Error('You cannot have both `cardSize` and `card` left unset');
    }

    let cardSize;
    if (this.cardSize.includes('%') && this.resizeViewport) {
      throw Error('You cannot use percentages with `resizeViewport`');
    } else {
      cardSize = this.cardSize
        .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
      this.trueCardSize = this.sanitizer.bypassSecurityTrustStyle(cardSize);
    }

    const fullCardSize = `calc(${this.trueCardSize} + ${paddingSize})`;
    this.trueViewportSize = this.sanitizer.bypassSecurityTrustStyle(`calc(${fullCardSize} * ${this.cards})`);
    if (this.cardItems && this.cardItems.first) {
      this.pixelCardSize = this.cardItems.first.nativeElement.clientWidth;
      this.cd.detectChanges();
    }
  }

  private convertNumberToUnit(unitless: string) {
    return `${unitless}${this.unit}`;
  }
}
