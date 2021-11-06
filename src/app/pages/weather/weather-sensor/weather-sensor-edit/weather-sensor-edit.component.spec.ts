import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorEditComponent } from './weather-sensor-edit.component';

xdescribe('WeatherSensorEditComponent', () => {
  let component: WeatherSensorEditComponent;
  let fixture: ComponentFixture<WeatherSensorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSensorEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSensorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
