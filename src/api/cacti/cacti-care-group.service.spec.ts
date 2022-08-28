import {TestBed} from "@angular/core/testing";
import {CactiCareGroupService} from "./cacti-care-group.service";
import {HttpClientModule} from "@angular/common/http";

describe("CactiCareGroupService", () => {
  let service: CactiCareGroupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CactiCareGroupService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
