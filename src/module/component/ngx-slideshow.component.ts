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
  @Input() resizeViewport = true;

  // Set initial index
  index = 0;
  min: number = -1;

  // These will be generated with ngAfterViewInit, as they rely on the number of cards loaded into the carousel
  max: number;
  private viewSize: number;
  private trueCardSize: string;
  private truePaddingSize: string;

  // Get elements to use later
  @ViewChild('viewport') viewport: ElementRef;
  @ViewChild('slides') slides: ElementRef;

  // To use with HammerJS
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  ngOnChanges(): void {
    this.onResize();
  }

  right(): void {
    this.rightBy(1);
  }

  left(): void {
    this.leftBy(1);
  }

  goTo(i: number): void {
    if (i > this.max || i < this.min) {
      throw new Error('goTo number on slideshow is out of bounds');
    } else {
      this.index = i;
      this.setLeft();
    }
  }

  leftBy(i: number): void {
    this.index = this.calc(this.index - i);
    this.setLeft();
  }

  rightBy(i: number): void {
    this.index = this.calc(this.index + i);
    this.setLeft();
  }

  private calc(newIndex: number): number {
    if (this.max <= newIndex) {
      return this.calc(newIndex - this.max);
    } else if (this.min >= newIndex) {
      return this.calc(this.max + newIndex);
    } else {
      return newIndex
    }
  }

  private setLeft(): void {
    const newSize = `calc(0px - calc(calc(${this.trueCardSize} + ${this.truePaddingSize}) * ${this.index}))`;
    this.renderer.setStyle(this.slides.nativeElement, 'left', newSize);
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

  private endsWith(str: string, searchStr: string) {
    return str.substr(str.length - searchStr.length, searchStr.length) === searchStr;
  };

  private onResize(): void {
    const cardObjs = this.slides.nativeElement.getElementsByTagName('li'); // Get list of objects
    const numCards = cardObjs.length; // Find out how many cards there are
    this.max = (numCards - this.cards) + 1; // Calculate max: # cards you see on screen - full # of cards

    if (!this.resizeViewport) {
      this.viewSize = this.viewport.nativeElement.offsetWidth;
    }

    // Gets card size based on viewport (to calculate % based sizes)
    if (this.cardSize.includes('%') && this.resizeViewport) {
      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.cardSize);
      this.trueCardSize = `${this.viewport.nativeElement.offsetWidth}px`;
    } else if (this.endsWith(this.cardSize, '%') && !this.resizeViewport) {
      // TODO: Support entries such as calc(20% - 5px) using regex instead of cruddy endsWith
      // TODO: Add tests for all unit types such as this
      const cardPercentage = (Number(this.cardSize.slice(0, -1)) / 100); // Turn into decimal to do math
      this.trueCardSize = `${this.viewSize * cardPercentage}px`
    } else {
      this.trueCardSize = this.cardSize;
    }

    // Gets card size based on viewport (to calculate % based sizes)
    if (this.padding.includes('%') && this.resizeViewport) {
      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.padding);
      this.truePaddingSize = `${this.viewport.nativeElement.offsetWidth}px`;
    } else if (this.endsWith(this.padding, '%') && !this.resizeViewport) {
      const cardPercentage = (Number(this.cardSize.slice(0, -1)) / 100); // Turn into decimal to do math
      this.truePaddingSize = `${this.viewSize * cardPercentage}px`
    } else {
      this.truePaddingSize = this.padding;
    }

    // Set size of cards + padding for calculating slides div and viewport div
    const fullCardSize = `calc(${this.trueCardSize} + ${this.truePaddingSize})`;

    // This is how wide the viewport will be
    if (this.resizeViewport) {
      this.renderer.setStyle(this.viewport.nativeElement, 'width', `calc(${fullCardSize} * ${this.cards})`);
    }

    // Set size of cards. Wish this could be class based, but alas not
    for (let i = 0; i < numCards; i++) {
      this.renderer.setStyle(cardObjs[i], 'width', `${this.trueCardSize}`);
      this.renderer.setStyle(cardObjs[i], 'margin', `0 calc(${this.truePaddingSize} / 2)`);
    }

    this.setLeft();
  }
}
