import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTimeSelectorComponent } from './weather-time-selector.component';

describe('WeatherTimeSelectorComponent', () => {
  let component: WeatherTimeSelectorComponent;
  let fixture: ComponentFixture<WeatherTimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherTimeSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
