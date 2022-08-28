import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CactiHistoryComponent} from './cacti-history.component';

describe('CactiHistoryComponent', () => {
  let component: CactiHistoryComponent;
  let fixture: ComponentFixture<CactiHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiHistoryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CactiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
