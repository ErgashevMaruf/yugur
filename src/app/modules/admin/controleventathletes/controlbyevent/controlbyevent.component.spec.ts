/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlbyeventComponent } from './controlbyevent.component';

describe('ControlbyeventComponent', () => {
  let component: ControlbyeventComponent;
  let fixture: ComponentFixture<ControlbyeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlbyeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlbyeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
