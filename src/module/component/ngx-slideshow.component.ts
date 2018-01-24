import {Component, ElementRef, ViewChild, Renderer2, Input, AfterViewInit, OnChanges, HostListener} from '@angular/core';

@Component({
  selector: 'ngx-slideshow',
  templateUrl: './ngx-slideshow.component.html',
  styleUrls: ['./ngx-slideshow.component.scss']
})
export class NgxSlideshowComponent implements AfterViewInit, OnChanges {
  @Input() cards = 1;
  @Input() padding = '14px';
  @Input() cardSize = '100%';
  @Input() disableTabbing = false; // If true, you cannot tab to other slides
  @Input() resizeViewport = true;
  @Input() unit = 'px';

  // Set initial index
  index = 0;
  min: number = -1;

  // These will be generated with ngAfterViewInit, as they rely on the number of cards loaded into the carousel
  max: number;
  private viewSize: number;
  private trueCardSize: string;
  private truePaddingSize: string;

  // These will be used in regex searches later
  private findNumbers = new RegExp(/([0-9]+(?:[.][0-9]+)?)(?![\.\w])/g);
  private findPercentages = new RegExp(/([0-9]+(?:[.][0-9]+)?%)/g);

  // Get elements to use later
  @ViewChild('viewport') private viewport: ElementRef;
  @ViewChild('slides')  slides: ElementRef;

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
    if (this.disableTabbing) {
      // This will disallow tabbing to other slides
      this.toggleCardListInput();
    }
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

  private toggleCardInput(card: any, num: number) {
    for (const input of card.querySelectorAll('button, input')) {
      input.tabIndex = num;
    }
  }

  private toggleCardListInput() {
    const cardObjs = this.slides.nativeElement.querySelectorAll('li');
    const numCards = cardObjs.length;
    for (let i = 0; i < numCards; i++) {
      if ((i < this.index) || (i >= (this.index + this.cards))) { // If not visible
        this.toggleCardInput(cardObjs[i], -1); // Disable tabs
      } else { // Otherwise
        this.toggleCardInput(cardObjs[i], 0); // Enable tabs
      }
    }
  }

  private convertPercentageToNumber(percentage: string) {
    const num = Number(percentage.slice(0, -1)) / 100;
    return `${this.viewSize * num}px`;
  };

  private convertNumberToUnit(unitless: string) {
    return `${unitless}${this.unit}`
  }

  // Host listener for window resize
  @HostListener('window:resize', [])
  private onResize(): void {
    const cardObjs = this.slides.nativeElement.getElementsByTagName('li'); // Get list of objects
    const numCards = cardObjs.length; // Find out how many cards there are
    this.max = (numCards - this.cards) + 1; // Calculate max: # cards you see on screen - full # of cards

    if (!this.resizeViewport) {
      this.renderer.removeStyle(this.viewport.nativeElement, 'width');
      // This is being done because [class.full-width] was not working in tests
      this.renderer.addClass(this.viewport.nativeElement, 'full-width')
      this.viewSize = this.viewport.nativeElement.offsetWidth;
    }

    // Gets card size based on viewport (to calculate % based sizes)
    if (this.cardSize.includes('%') && this.resizeViewport) {
      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.cardSize);
      this.trueCardSize = `${this.viewport.nativeElement.offsetWidth}px`;
    } else if (this.cardSize.includes('%') && !this.resizeViewport) {
      // TODO: Add tests for all unit types such as this
      this.trueCardSize = this.cardSize
                            .replace(this.findPercentages, this.convertPercentageToNumber.bind(this)) // Turn into decimal to do math
                            .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
    } else {
      this.trueCardSize = this.cardSize.replace(this.findNumbers, this.convertNumberToUnit.bind(this));
    }

    // Gets card size based on viewport (to calculate % based sizes)
    if (this.padding.includes('%') && this.resizeViewport) {
      this.renderer.setStyle(this.viewport.nativeElement, 'width', this.padding);
      this.truePaddingSize = `${this.viewport.nativeElement.offsetWidth}px`;
    } else if (this.padding.includes('%') && !this.resizeViewport) {
      this.truePaddingSize = this.padding
                               .replace(this.findPercentages, this.convertPercentageToNumber.bind(this)) // Turn into decimal to do math
                               .replace(this.findNumbers, this.convertNumberToUnit.bind(this));
    } else {
      this.truePaddingSize = this.padding.replace(this.findNumbers, this.convertNumberToUnit.bind(this));
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
