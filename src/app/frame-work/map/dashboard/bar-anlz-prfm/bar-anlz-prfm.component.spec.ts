import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAnlzPrfmComponent } from './bar-anlz-prfm.component';

describe('BarAnlzPrfmComponent', () => {
  let component: BarAnlzPrfmComponent;
  let fixture: ComponentFixture<BarAnlzPrfmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarAnlzPrfmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAnlzPrfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
