import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResultDetailsCarouselComponent } from './img-result-details-carousel.component';

describe('ImgResultDetailsCarouselComponent', () => {
  let component: ImgResultDetailsCarouselComponent;
  let fixture: ComponentFixture<ImgResultDetailsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResultDetailsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgResultDetailsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
