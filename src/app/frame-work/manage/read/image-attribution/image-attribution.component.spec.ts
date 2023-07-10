import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAttributionComponent } from './image-attribution.component';

describe('ImageAttributionComponent', () => {
  let component: ImageAttributionComponent;
  let fixture: ComponentFixture<ImageAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAttributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
