import {TestBed} from '@angular/core/testing';
import {CactiService} from './cacti.service';

xdescribe('CactiService', () => {
  let service: CactiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
