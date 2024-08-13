import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtOutputDgComponent } from './txt-output-dg.component';

describe('TxtOutputDgComponent', () => {
  let component: TxtOutputDgComponent;
  let fixture: ComponentFixture<TxtOutputDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TxtOutputDgComponent]
    });
    fixture = TestBed.createComponent(TxtOutputDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
