/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {CarouselComponent} from './carousel.component';
import {MaterialModule} from '@angular/material';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CarouselComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should move to 0 if out of bounds right', () => {
    component.index = 4;
    component.max = 5;
    component.right();
    expect(component.index).toBe(0);
  });

  it('should move to 0 if out of bounds left', () => {
    component.index = 0;
    component.max = 5;
    component.left();
    expect(component.index).toBe(4);
  });

});
