import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLazyComponent } from './all-lazy.component';

describe('AllLazyComponent', () => {
  let component: AllLazyComponent;
  let fixture: ComponentFixture<AllLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLazyComponent]
    });
    fixture = TestBed.createComponent(AllLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
