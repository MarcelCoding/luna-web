import {TestBed} from "@angular/core/testing";
import {CactiCactusService} from "./cacti-cactus.service";
import {HttpClientModule} from "@angular/common/http";

describe("CactiCactusService", () => {
  let service: CactiCactusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CactiCactusService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
