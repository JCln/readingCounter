import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResultDetailsComponent } from './img-result-details.component';

describe('ImgResultDetailsComponent', () => {
  let component: ImgResultDetailsComponent;
  let fixture: ComponentFixture<ImgResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResultDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
