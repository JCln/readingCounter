import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdEditDgComponent } from './rd-edit-dg.component';

describe('RdEditDgComponent', () => {
  let component: RdEditDgComponent;
  let fixture: ComponentFixture<RdEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
