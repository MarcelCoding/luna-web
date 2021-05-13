import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CactiHistoryEntryComponent } from './cacti-history-entry.component';

xdescribe('CactiHistoryEntryComponent', () => {
  let component: CactiHistoryEntryComponent;
  let fixture: ComponentFixture<CactiHistoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiHistoryEntryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiHistoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
