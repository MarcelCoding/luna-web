import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiCactusNotFoundComponent} from "./cacti-cactus-not-found.component";

describe("CactiCactusNotFoundComponent", () => {
  let component: CactiCactusNotFoundComponent;
  let fixture: ComponentFixture<CactiCactusNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiCactusNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CactiCactusNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
