import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CactiNewCactusComponent} from './cacti-new-cactus.component';

describe('CactiNewCactusComponent', () => {
  let component: CactiNewCactusComponent;
  let fixture: ComponentFixture<CactiNewCactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiNewCactusComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiNewCactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
