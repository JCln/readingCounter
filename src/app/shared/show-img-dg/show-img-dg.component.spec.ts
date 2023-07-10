import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImgDgComponent } from './show-img-dg.component';

describe('ShowImgDgComponent', () => {
  let component: ShowImgDgComponent;
  let fixture: ComponentFixture<ShowImgDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowImgDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImgDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
