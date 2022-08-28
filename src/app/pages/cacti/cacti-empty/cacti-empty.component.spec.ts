import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiEmptyComponent} from "./cacti-empty.component";

describe("CactiEmptyComponent", () => {
  let component: CactiEmptyComponent;
  let fixture: ComponentFixture<CactiEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiEmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CactiEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
