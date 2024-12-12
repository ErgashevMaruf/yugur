/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectnumberComponent } from './selectnumber.component';

describe('SelectnumberComponent', () => {
  let component: SelectnumberComponent;
  let fixture: ComponentFixture<SelectnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
