import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {NgxSlideshowComponent} from './ngx-slideshow.component';
import {WrapSlicePipe} from './wrap-slice.pipe';
import {NgxSlideshowCardDirective} from './ngx-slideshow-card.directive';

@Component({
  selector: 'ngx-slideshow-test-cmp',
  template: `
    <div style="width: 200px">
      <ngx-slideshow #carousel [cards]="3" [cardSize]="'350px'" [padding]="'14px'" style="display: block;">
        <ng-template ngx-slideshow-card *ngFor="let _ of [1,2,3,4,5,6,7,8,9]">
          <img src="http://via.placeholder.com/350x150"/>
        </ng-template>
      </ngx-slideshow>
    </div>
  `
})
class TestComponent {
  @ViewChild(NgxSlideshowComponent)
  public slideshow: NgxSlideshowComponent;
}

describe('NgxSlideshowComponent', function () {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        NgxSlideshowComponent,
        NgxSlideshowCardDirective,
        WrapSlicePipe,
        TestComponent
      ]
    })
      .createComponent(TestComponent);
    el = fixture.debugElement.nativeElement;
    comp = fixture.componentInstance;
    fixture.detectChanges(); // initial binding
  });

  it('should create', () => {
    expect(comp).toBeDefined();
  });

  it('should have padding of 7px on each side', () => {
    comp.slideshow.__onResize();
    fixture.detectChanges();
    console.log(el.querySelector('.ngxCardItem'));
    console.log(comp.slideshow.truePaddingSize);
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).margin).toBe('0px 7px');
  });

  it('should have width of 350px on each side', () => {
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).width).toBe('350px');
  });

  it('should move right', () => {
    comp.slideshow.index = 2;
    comp.slideshow.right();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  it('should move left', () => {
    comp.slideshow.index = 2;
    comp.slideshow.left();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(1);
  });


  it('should move to the correct index leftBy', () => {
    comp.slideshow.index = 4;
    comp.slideshow.leftBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(1);
  });

  it('should move to the correct index rightBy', () => {
    comp.slideshow.index = 0;
    comp.slideshow.rightBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  it('should move to the correct index if using goTo', () => {
    comp.slideshow.index = 0;
    comp.slideshow.goTo(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  // // The following tests SHOULD pass but do not for unknown reasons
  it('should convert unitless to unit based number', () => {
    comp.slideshow.padding = '0';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).margin).toBe('0px');
  });

  it('should be able to handle a unit decimal', () => {
    comp.slideshow.padding = '0.5px';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).margin).toBe('0px 0.25px');
  });

  it('should convert unitless decimal to unit based number', () => {
    comp.slideshow.padding = '0.5';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).margin).toBe('0px 0.25px');
  });

  it('should respect resizeViewport', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('.ngx-slideshow-component')).style.width).toBe('');
  });

  it('should handle percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = '100%';
    comp.slideshow.padding = '0px';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).width).toBe('200px');
  });

  it('should handle calc percentage with pixels for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = 'calc(100% - 10px)';
    comp.slideshow.padding = '10px';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).width).toBe('190px');
  });

  it('should handle calc percentage with percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = 'calc(100% - 20%)';
    comp.slideshow.padding = '20%';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).width).toBe('160px'); // 200 * 20%
  });

  it('should handle calc percentage with percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = '74.5%';
    comp.slideshow.padding = '25.5%';
    comp.slideshow.__onResize();
    fixture.detectChanges();
    expect(getComputedStyle(el.querySelector('.ngxCardItem')).margin).toBe('0px 25.5px'); // 200 * 25.5%= 51. 51/2
  });
});
