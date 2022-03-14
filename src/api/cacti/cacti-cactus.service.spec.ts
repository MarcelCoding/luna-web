import {TestBed} from '@angular/core/testing';
import {CactiCactusService} from './cacti-cactus.service';

describe('CactiCactusService', () => {
  let service: CactiCactusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiCactusService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
