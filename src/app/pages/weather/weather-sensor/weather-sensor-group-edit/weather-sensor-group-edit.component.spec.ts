import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorGroupEditComponent } from './weather-sensor-group-edit.component';

describe('WeatherSensorGroupEditComponent', () => {
  let component: WeatherSensorGroupEditComponent;
  let fixture: ComponentFixture<WeatherSensorGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSensorGroupEditComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSensorGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
