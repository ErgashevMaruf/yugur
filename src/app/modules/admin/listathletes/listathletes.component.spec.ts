/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListathletesComponent } from './listathletes.component';

describe('ListathletesComponent', () => {
  let component: ListathletesComponent;
  let fixture: ComponentFixture<ListathletesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListathletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListathletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
