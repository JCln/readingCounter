import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterByFragmentAllLazyComponent } from './master-by-fragment-all-lazy.component';

describe('MasterByFragmentAllLazyComponent', () => {
  let component: MasterByFragmentAllLazyComponent;
  let fixture: ComponentFixture<MasterByFragmentAllLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterByFragmentAllLazyComponent]
    });
    fixture = TestBed.createComponent(MasterByFragmentAllLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
