import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdDgComponent } from './fd-dg.component';

describe('FdDgComponent', () => {
  let component: FdDgComponent;
  let fixture: ComponentFixture<FdDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdDgComponent]
    });
    fixture = TestBed.createComponent(FdDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
