import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, Renderer2, ViewChild} from '@angular/core';

import {NgxSlideshowComponent} from './ngx-slideshow.component';

describe('NgxSlideshowComponent', function () {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [],
      declarations: [NgxSlideshowComponent, TestComponent]
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
    expect(el.querySelector('li').style.margin).toBe('0px calc(7px)');
  });

  it('should have width of 350px on each side', () => {
    expect(el.querySelector('li').style.width).toBe('350px');
  });

  it('should move right', () => {
    comp.slideshow.index = 2;
    comp.slideshow.max = 5;
    comp.slideshow.right();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  it('should move left', () => {
    comp.slideshow.index = 2;
    comp.slideshow.max = 5;
    comp.slideshow.left();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(1);
  });

  it('should move to 0 if out of bounds right', () => {
    comp.slideshow.index = 4;
    comp.slideshow.max = 5;
    comp.slideshow.right();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(0);
  });

  it('should move to max - 1 if out of bounds left', () => {
    comp.slideshow.index = 0;
    comp.slideshow.max = 5;
    comp.slideshow.left();
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(4);
  });

  it('should move to the correct index leftBy', () => {
    comp.slideshow.index = 4;
    comp.slideshow.max = 5;
    comp.slideshow.leftBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(1);
  });

  it('should move to the correct index rightBy', () => {
    comp.slideshow.index = 0;
    comp.slideshow.max = 5;
    comp.slideshow.rightBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  it('should move to the correct index if out of bounds leftBy', () => {
    comp.slideshow.index = 0;
    comp.slideshow.max = 5;
    comp.slideshow.leftBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(2);
  });

  it('should move to the correct index if out of bounds rightBy', () => {
    comp.slideshow.index = 4;
    comp.slideshow.max = 5;
    comp.slideshow.rightBy(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(2);
  });

  it('should move to the correct index if using goTo', () => {
    comp.slideshow.index = 0;
    comp.slideshow.max = 5;
    comp.slideshow.goTo(3);
    fixture.detectChanges();
    expect(comp.slideshow.index).toBe(3);
  });

  it('should throw an error if using a number too high with goTo', () => {
    comp.slideshow.index = 0;
    comp.slideshow.max = 5;
    fixture.detectChanges();
    expect(() => comp.slideshow.goTo(6)).toThrow();
  });

  it('should throw an error if using a number too low with goTo', () => {
    comp.slideshow.index = 0;
    comp.slideshow.min = 2;
    comp.slideshow.max = 5;
    fixture.detectChanges();
    expect(() => comp.slideshow.goTo(1)).toThrow();
  });

  // // The following tests SHOULD pass but do not for unknown reasons
  it('should convert unitless to unit based number', () => {
    comp.slideshow.padding = '0';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.margin).toBe('0px calc(0px)');
  });

  it('should be able to handle a unit decimal', () => {
    comp.slideshow.padding = '0.5px';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.margin).toBe('0px calc(0.25px)');
  });

  it('should convert unitless decimal to unit based number', () => {
    comp.slideshow.padding = '0.5';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.margin).toBe('0px calc(0.25px)');
  });


  it('should disable tabs when not in view', () => {
    comp.slideshow.cards = 1;
    comp.slideshow.disableTabbing = true;
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('button').tabIndex).toBe(-1);
  });

  it('should not disable tabs when in view', () => {
    comp.slideshow.disableTabbing = true;
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('button').tabIndex).toBe(0);
  });

  it('should respect resizeViewport', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.ngOnChanges();
    expect((<HTMLElement>el.querySelector('.viewport')).style.width).toBe('');
  });

  it('should handle percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = '100%';
    comp.slideshow.padding = '0px';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.width).toBe('200px');
  });

  it('should handle calc percentage with pixels for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = 'calc(100% - 10px)';
    comp.slideshow.padding = '10px';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.width).toBe('calc(190px)');
  });

  it('should handle calc percentage with percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = 'calc(100% - 20%)';
    comp.slideshow.padding = '20%';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.width).toBe('calc(160px)'); // 200 * 20%
  });

  it('should handle calc percentage with percentage for size', () => {
    comp.slideshow.resizeViewport = false;
    comp.slideshow.cards = 1;
    comp.slideshow.cardSize = '74.5%';
    comp.slideshow.padding = '25.5%';
    comp.slideshow.ngOnChanges();
    expect(el.querySelector('li').style.margin).toBe('0px calc(25.5px)'); // 200 * 25.5%= 51. 51/2
  });
});

@Component({
  selector: 'test-cmp',
  template: `
    <div style="width: 200px">
      <ngx-slideshow #carousel [cards]="3" [cardSize]="'350px'" [padding]="'14px'" style="display: block;">
        <li><img src="http://via.placeholder.com/350x150"></li>
        <li><img src="http://via.placeholder.com/350x150"></li>
        <li><button>Click me</button></li>
        <li><img src="http://via.placeholder.com/350x150"></li>
        <li><img src="http://via.placeholder.com/350x150"></li>
        <li><img src="http://via.placeholder.com/350x150"></li>
      </ngx-slideshow>
    </div>
  `
})
class TestComponent {
  @ViewChild(NgxSlideshowComponent)
  public slideshow: NgxSlideshowComponent;
}
