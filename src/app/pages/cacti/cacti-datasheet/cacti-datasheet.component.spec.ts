import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CactiDatasheetComponent } from './cacti-datasheet.component';

xdescribe('CactiDatasheetComponent', () => {
  let component: CactiDatasheetComponent;
  let fixture: ComponentFixture<CactiDatasheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiDatasheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiDatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
