import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CactiCactusFormComponent} from './cacti-cactus-form.component';

describe('CactiCactusFormComponent', () => {
  let component: CactiCactusFormComponent;
  let fixture: ComponentFixture<CactiCactusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiCactusFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiCactusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
