import {TestBed} from "@angular/core/testing";
import {CactiApiService} from "./cacti-api.service";

describe("CactiApiService", () => {
  let service: CactiApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(CactiApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
