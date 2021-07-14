import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAsideComponent } from './weather-aside.component';

xdescribe('WeatherAsideComponent', () => {
  let component: WeatherAsideComponent;
  let fixture: ComponentFixture<WeatherAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherAsideComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
