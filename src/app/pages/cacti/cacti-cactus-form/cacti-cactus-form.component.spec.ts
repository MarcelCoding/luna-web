import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CactiCactusFormComponent} from "./cacti-cactus-form.component";
import {HttpClientModule} from "@angular/common/http";

describe("CactiCactusFormComponent", () => {
  let component: CactiCactusFormComponent;
  let fixture: ComponentFixture<CactiCactusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiCactusFormComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CactiCactusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
