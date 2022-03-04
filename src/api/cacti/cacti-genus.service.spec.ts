import {TestBed} from '@angular/core/testing';
import {CactiGenusService} from './cacti-genus.service';

describe('CactiGenusService', () => {
  let service: CactiGenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiGenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
