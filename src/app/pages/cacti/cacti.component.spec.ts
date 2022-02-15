import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CactiComponent} from './cacti.component';

describe('CactiComponent', () => {
  let component: CactiComponent;
  let fixture: ComponentFixture<CactiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CactiComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CactiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
