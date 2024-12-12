/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventAthletesListComponent } from './event-athletes-list.component';

describe('EventAthletesListComponent', () => {
  let component: EventAthletesListComponent;
  let fixture: ComponentFixture<EventAthletesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAthletesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAthletesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
