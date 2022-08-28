import {TestBed} from "@angular/core/testing";
import {CactiFormService} from "./cacti-form.service";
import {HttpClientModule} from "@angular/common/http";

describe("CactiFormService", () => {
  let service: CactiFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CactiFormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
