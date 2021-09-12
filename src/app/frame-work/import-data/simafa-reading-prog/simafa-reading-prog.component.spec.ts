import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimafaReadingProgComponent } from './simafa-reading-prog.component';

describe('SimafaReadingProgComponent', () => {
  let component: SimafaReadingProgComponent;
  let fixture: ComponentFixture<SimafaReadingProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimafaReadingProgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimafaReadingProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
