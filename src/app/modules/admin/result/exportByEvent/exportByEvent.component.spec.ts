/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExportByEventComponent } from './exportByEvent.component';

describe('ExportByEventComponent', () => {
  let component: ExportByEventComponent;
  let fixture: ComponentFixture<ExportByEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportByEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportByEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
