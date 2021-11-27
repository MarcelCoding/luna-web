import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CactiDatasheetCompactComponent } from './cacti-datasheet.compact.component';

xdescribe('CactiDatasheetCompactComponent', () => {
  let component: CactiDatasheetCompactComponent;
  let fixture: ComponentFixture<CactiDatasheetCompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiDatasheetCompactComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiDatasheetCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
