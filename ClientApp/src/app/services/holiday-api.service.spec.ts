import { TestBed } from '@angular/core/testing';

import { HolidayApiService } from './holiday-api.service';

describe('HolidayApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HolidayApiService = TestBed.get(HolidayApiService);
    expect(service).toBeTruthy();
  });
});
