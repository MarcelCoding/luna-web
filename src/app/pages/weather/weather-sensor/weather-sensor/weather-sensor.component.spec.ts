import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorComponent } from './weather-sensor.component';

xdescribe('WeatherSensorComponent', () => {
  let component: WeatherSensorComponent;
  let fixture: ComponentFixture<WeatherSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSensorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
