import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpointsComponent } from './endpoints.component';

xdescribe('EndpointsComponent', () => {
  let component: EndpointsComponent;
  let fixture: ComponentFixture<EndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});