import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieImgAttrAnlzComponent } from './pie-img-attr-anlz.component';

describe('PieImgAttrAnlzComponent', () => {
  let component: PieImgAttrAnlzComponent;
  let fixture: ComponentFixture<PieImgAttrAnlzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieImgAttrAnlzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieImgAttrAnlzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
