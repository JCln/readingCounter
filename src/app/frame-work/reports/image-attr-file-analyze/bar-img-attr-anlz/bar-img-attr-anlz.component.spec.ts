import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarImgAttrAnlzComponent } from './bar-img-attr-anlz.component';

describe('BarImgAttrAnlzComponent', () => {
  let component: BarImgAttrAnlzComponent;
  let fixture: ComponentFixture<BarImgAttrAnlzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarImgAttrAnlzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarImgAttrAnlzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
