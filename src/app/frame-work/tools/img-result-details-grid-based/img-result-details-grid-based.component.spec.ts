import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResultDetailsGridBasedComponent } from './img-result-details-grid-based.component';

describe('ImgResultDetailsGridBasedComponent', () => {
  let component: ImgResultDetailsGridBasedComponent;
  let fixture: ComponentFixture<ImgResultDetailsGridBasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResultDetailsGridBasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgResultDetailsGridBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
