import {TestBed} from "@angular/core/testing";
import {CactiGenusService} from "./cacti-genus.service";
import {HttpClientModule} from "@angular/common/http";

describe("CactiGenusService", () => {
  let service: CactiGenusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CactiGenusService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
