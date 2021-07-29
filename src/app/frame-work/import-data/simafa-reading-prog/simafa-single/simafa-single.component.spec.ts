import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimafaSingleComponent } from './simafa-single.component';

describe('SimafaSingleComponent', () => {
  let component: SimafaSingleComponent;
  let fixture: ComponentFixture<SimafaSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimafaSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimafaSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
