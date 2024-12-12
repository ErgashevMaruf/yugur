/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OldresultService } from './oldresult.service';

describe('Service: Oldresult', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OldresultService]
    });
  });

  it('should ...', inject([OldresultService], (service: OldresultService) => {
    expect(service).toBeTruthy();
  }));
});
