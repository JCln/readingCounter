import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimafaBatchComponent } from './simafa-batch.component';

describe('SimafaBatchComponent', () => {
  let component: SimafaBatchComponent;
  let fixture: ComponentFixture<SimafaBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimafaBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimafaBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
