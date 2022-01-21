import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImageCarouselDetailsComponent } from './random-image-carousel-details.component';

describe('RandomImageCarouselDetailsComponent', () => {
  let component: RandomImageCarouselDetailsComponent;
  let fixture: ComponentFixture<RandomImageCarouselDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomImageCarouselDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomImageCarouselDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
