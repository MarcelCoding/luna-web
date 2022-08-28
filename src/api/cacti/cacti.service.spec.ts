import {TestBed} from "@angular/core/testing";
import {CactiService} from "./cacti.service";

describe("CactiService", () => {
  let service: CactiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(CactiService);
  });

  xit("should be created", () => {
    expect(service).toBeTruthy();
  });
});
