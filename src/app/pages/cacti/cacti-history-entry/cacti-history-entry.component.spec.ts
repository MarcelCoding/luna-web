import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CactiHistoryEntryComponent} from './cacti-history-entry.component';

describe('CactiHistoryEntryComponent', () => {
  let component: CactiHistoryEntryComponent;
  let fixture: ComponentFixture<CactiHistoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiHistoryEntryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CactiHistoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
