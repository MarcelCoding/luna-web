import {TestBed} from "@angular/core/testing";
import {CactiSpecieService} from "./cacti-specie.service";
import {HttpClientModule} from "@angular/common/http";

describe("CactiSpecieService", () => {
  let service: CactiSpecieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CactiSpecieService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
