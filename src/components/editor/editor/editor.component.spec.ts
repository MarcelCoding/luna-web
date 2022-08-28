import {ComponentFixture, TestBed} from "@angular/core/testing";
import {EditorComponent} from "./editor.component";
import {OverlayModule} from "@angular/cdk/overlay";

describe("EditorComponent", () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
