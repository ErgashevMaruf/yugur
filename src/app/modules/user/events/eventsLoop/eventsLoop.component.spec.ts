/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventsLoopComponent } from './eventsLoop.component';

describe('EventsLoopComponent', () => {
  let component: EventsLoopComponent;
  let fixture: ComponentFixture<EventsLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
