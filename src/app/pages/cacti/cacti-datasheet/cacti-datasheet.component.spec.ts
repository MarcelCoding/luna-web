import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiDatasheetComponent} from "./cacti-datasheet.component";

describe("CactiDatasheetComponent", () => {
  let component: CactiDatasheetComponent;
  let fixture: ComponentFixture<CactiDatasheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiDatasheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CactiDatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
