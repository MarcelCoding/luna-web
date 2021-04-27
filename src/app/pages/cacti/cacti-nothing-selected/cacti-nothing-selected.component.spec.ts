import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CactiNothingSelectedComponent } from './cacti-nothing-selected.component';

describe('CactiNothingSelectedComponent', () => {
  let component: CactiNothingSelectedComponent;
  let fixture: ComponentFixture<CactiNothingSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiNothingSelectedComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiNothingSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
