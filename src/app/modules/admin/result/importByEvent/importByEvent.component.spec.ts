/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImportByEventComponent } from './importByEvent.component';

describe('ImportByEventComponent', () => {
  let component: ImportByEventComponent;
  let fixture: ComponentFixture<ImportByEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportByEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportByEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
