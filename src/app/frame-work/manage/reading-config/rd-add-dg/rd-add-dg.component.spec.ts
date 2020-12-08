import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdAddDgComponent } from './rd-add-dg.component';

describe('RdAddDgComponent', () => {
  let component: RdAddDgComponent;
  let fixture: ComponentFixture<RdAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
