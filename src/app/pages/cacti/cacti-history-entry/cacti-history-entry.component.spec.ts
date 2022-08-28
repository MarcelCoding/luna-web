import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiHistoryEntryComponent} from "./cacti-history-entry.component";
import {HttpClientModule} from "@angular/common/http";

describe("CactiHistoryEntryComponent", () => {
  let component: CactiHistoryEntryComponent;
  let fixture: ComponentFixture<CactiHistoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiHistoryEntryComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CactiHistoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
