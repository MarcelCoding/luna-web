import {TestBed} from "@angular/core/testing";
import {PendingChangesGuard} from "./pending-changes.guard";

describe("PendingChangesGuard", () => {
  let guard: PendingChangesGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    guard = TestBed.inject(PendingChangesGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
