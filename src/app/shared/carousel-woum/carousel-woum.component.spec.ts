import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWoumComponent } from './carousel-woum.component';

describe('CarouselWoumComponent', () => {
  let component: CarouselWoumComponent;
  let fixture: ComponentFixture<CarouselWoumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselWoumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWoumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
