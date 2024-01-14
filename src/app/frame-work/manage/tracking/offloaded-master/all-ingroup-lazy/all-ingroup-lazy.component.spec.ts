import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIngroupLazyComponent } from './all-ingroup-lazy.component';

describe('AllIngroupLazyComponent', () => {
  let component: AllIngroupLazyComponent;
  let fixture: ComponentFixture<AllIngroupLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllIngroupLazyComponent]
    });
    fixture = TestBed.createComponent(AllIngroupLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
