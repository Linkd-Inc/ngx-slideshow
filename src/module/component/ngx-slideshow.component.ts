import {Component, ElementRef, ViewChild, Renderer2, Input, AfterViewInit, OnChanges} from '@angular/core';

@Component({
  selector: 'ngx-slideshow',
  templateUrl: './ngx-slideshow.component.html',
  styleUrls: ['./ngx-slideshow.component.scss']
})
export class NgxSlideshowComponent implements AfterViewInit, OnChanges {
  @Input() cards = 1;
  @Input() padding = '14px';
  @Input() cardSize = '100%';

  // Set initial index
  index = 0;
  min: number = -1;

  // These will be generated with ngAfterViewInit, as they rely on the number of cards loaded into the carousel
  max: number;
  viewSize: string;
  trueCardSize: string;
  truePaddingSize: string;

  // Get elements to use later
  @ViewChild('viewport') viewport: ElementRef;
  @ViewChild('slides') slides: ElementRef;

  // To use with HammerJS
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.onResize(true);
  }

  ngOnChanges() {
    this.onResize(true);
  }

  right() {
    this.index++;
    if (this.index === this.max) {
      this.index = 0;
    }
    this.setLeft();
  }

  left() {
    this.index--;
    if (this.index === this.min) {
      this.index = this.max - 1;
    }
    this.setLeft();
  }

  goTo(i: number) {
    if (i > this.max || i < this.min) {
      throw new Error('goTo number on slideshow is out of bounds');
    } else {
      this.index = i;
      this.setLeft();
    }
  }

  setLeft() {
    const newSize = `calc(0px - calc(calc(${this.trueCardSize}px + ${this.truePaddingSize}px) * ${this.index}))`;
    this.renderer.setStyle(this.slides.nativeElement, 'left', newSize);
  }

  // HammerJS Example. Not sure if I like the syntax; May change
  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.left();
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      this.right();
    }
  }

  onResize(overwrite: boolean = false) {
    if (this.cardSize.includes('%') || overwrite) {
      const cardObjs = this.slides.nativeElement.getElementsByTagName('li');
      const numCards = cardObjs.length;
      this.max = (numCards - this.cards) + 1;

      // Gets card size based on viewport
      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.cardSize);
      this.trueCardSize = this.viewport.nativeElement.offsetWidth;

      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.padding);
      this.truePaddingSize = this.viewport.nativeElement.offsetWidth;

      const fullCardSize = `calc(${this.trueCardSize}px + ${this.truePaddingSize}px)`;

      // This is how wide the viewport will be
      this.renderer.setStyle(this.viewport.nativeElement, 'width', `calc(${fullCardSize} * ${this.cards})`);

      // This sets slides to be exactly the width needed for the cards on screen
      this.renderer.setStyle(this.slides.nativeElement, 'width', `calc(${fullCardSize} * ${numCards})`);

      // Set size of cards. Wish this could be class based, but alas not
      for (let i = 0; i < numCards; i++) {
        this.renderer.setStyle(cardObjs[i], 'width', `${this.trueCardSize}px`);
        this.renderer.setStyle(cardObjs[i], 'margin', `0 calc(${this.truePaddingSize}px / 2)`);
      }
    }
    this.setLeft();
  }
}
