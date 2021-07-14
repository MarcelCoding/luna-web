import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorGroupComponent } from './weather-sensor-group.component';

xdescribe('WeatherSensorGroupComponent', () => {
  let component: WeatherSensorGroupComponent;
  let fixture: ComponentFixture<WeatherSensorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSensorGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSensorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
