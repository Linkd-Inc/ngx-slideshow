import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxSlideshowComponent } from './ngx-slideshow.component';

describe('NgxSlideshowComponent', function () {
  let de: DebugElement;
  let comp: NgxSlideshowComponent;
  let fixture: ComponentFixture<NgxSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSlideshowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSlideshowComponent);
    comp = fixture.componentInstance;
    // de = fixture.debugElement.query(By.css('p.description'));
  });

  // it('should have expected <p> text', () => {
  //   fixture.detectChanges();
  //   const p = de.nativeElement;
  //   expect(p.innerText).toEqual('An Agular 2+ slideshow component ');
  // });

  it('should create', () => {
    expect(comp).toBeDefined();
  });

  it('should move right', () => {
    comp.index = 2;
    comp.max = 5;
    comp.right();
    expect(comp.index).toBe(3);
  });

  it('should move left', () => {
    comp.index = 2;
    comp.max = 5;
    comp.left();
    expect(comp.index).toBe(1);
  });

  it('should move to 0 if out of bounds right', () => {
    comp.index = 4;
    comp.max = 5;
    comp.right();
    expect(comp.index).toBe(0);
  });

  it('should move to 0 if out of bounds left', () => {
    comp.index = 0;
    comp.max = 5;
    comp.left();
    expect(comp.index).toBe(4);
  });

  it('should move to the correct index if using goTo', () => {
    comp.index = 0;
    comp.max = 5;
    comp.goTo(3);
    expect(comp.index).toBe(3);
  });

  it('should throw an error if using a number too high with goTo', () => {
    comp.index = 0;
    comp.max = 5;
    expect(() => comp.goTo(6)).toThrow();
  });

  it('should throw an error if using a number too low with goTo', () => {
    comp.index = 0;
    comp.min = 2;
    comp.max = 5;
    expect(() => comp.goTo(1)).toThrow();
  });
});
