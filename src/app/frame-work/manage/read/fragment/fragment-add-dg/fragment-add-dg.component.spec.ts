import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentAddDgComponent } from './fragment-add-dg.component';

describe('FragmentAddDgComponent', () => {
  let component: FragmentAddDgComponent;
  let fixture: ComponentFixture<FragmentAddDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FragmentAddDgComponent]
    });
    fixture = TestBed.createComponent(FragmentAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
