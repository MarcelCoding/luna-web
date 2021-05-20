import { TestBed } from '@angular/core/testing';

import { SetupGuard } from './setup.guard';

xdescribe('SetupGuard', () => {
  let guard: SetupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SetupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
