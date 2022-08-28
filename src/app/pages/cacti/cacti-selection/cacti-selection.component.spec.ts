import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiSelectionComponent} from "./cacti-selection.component";

xdescribe("CactiSelectionComponent", () => {
  let component: CactiSelectionComponent;
  let fixture: ComponentFixture<CactiSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiSelectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
