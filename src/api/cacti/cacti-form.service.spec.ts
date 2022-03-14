import {TestBed} from '@angular/core/testing';
import {CactiFormService} from './cacti-form.service';

describe('CactiFormService', () => {
  let service: CactiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiFormService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
