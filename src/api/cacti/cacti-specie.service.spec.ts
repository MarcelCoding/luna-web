import {TestBed} from '@angular/core/testing';
import {CactiSpecieService} from './cacti-specie.service';

describe('CactiSpecieService', () => {
  let service: CactiSpecieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiSpecieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
