import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImageCarouselComponent } from './random-image-carousel.component';

describe('RandomImageCarouselComponent', () => {
  let component: RandomImageCarouselComponent;
  let fixture: ComponentFixture<RandomImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomImageCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
