import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, ViewChild} from '@angular/core';

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


  // it('should change padding size to 0px', () => {
  //   comp.slideshow.padding = '0px';
  //   fixture.detectChanges();
  // // This does not give me what I want to see
  //   const style = el.querySelector('li').style;
  // // But this does???
  //   console.log(el.querySelector('li').style);
  //   expect(style.margin).toBe('0px calc(0px)');
  // });


  // TODO: Add tests for resizeViewport and all unit types
  // TODO: Add tests for disableTabbing
  // TODO: Add tests for `calc(80% - 20px)`
  // TODO: Add tests for `calc(80% - 20%)`
  // TODO: Add tests for unitless ('80')
  // TODO: Add tests for unitless decimal ('90.5')
  // TODO: Add tests for united decimal ('90.5px')
  // TODO: Add tests for percentage decimal ('25.5%')
});


@Component({
  selector: 'test-cmp',
  template: `
    <ngx-slideshow #carousel [cards]="3" [cardSize]="'350px'" [padding]="'14px'">
      <li><img src="http://via.placeholder.com/350x150"></li>
      <li><img src="http://via.placeholder.com/350x150"></li>
      <li><img src="http://via.placeholder.com/350x150"></li>
      <li><img src="http://via.placeholder.com/350x150"></li>
      <li><img src="http://via.placeholder.com/350x150"></li>
      <li><img src="http://via.placeholder.com/350x150"></li>
    </ngx-slideshow>
  `
})
class TestComponent {
  @ViewChild(NgxSlideshowComponent)
  public slideshow: NgxSlideshowComponent;
}
