import {TestBed} from '@angular/core/testing';

import {CactiApiService} from './cacti-api.service';

xdescribe('CactiApiService', () => {
  let service: CactiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
