import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResultCarouselComponent } from './img-result-carousel.component';

describe('ImgResultCarouselComponent', () => {
  let component: ImgResultCarouselComponent;
  let fixture: ComponentFixture<ImgResultCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResultCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgResultCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
