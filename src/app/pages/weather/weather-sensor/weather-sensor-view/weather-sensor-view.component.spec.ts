import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorViewComponent } from './weather-sensor-view.component';

xdescribe('WeatherSensorViewComponent', () => {
  let component: WeatherSensorViewComponent;
  let fixture: ComponentFixture<WeatherSensorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSensorViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSensorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
