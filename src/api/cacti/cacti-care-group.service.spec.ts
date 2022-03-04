import {TestBed} from '@angular/core/testing';
import {CactiCareGroupService} from './cacti-care-group.service';

describe('CactiCareGroupService', () => {
  let service: CactiCareGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CactiCareGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
