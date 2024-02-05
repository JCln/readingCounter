import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterByFragmentAllInGroupLazyComponent } from './master-by-fragment-all-in-group-lazy.component';

describe('MasterByFragmentAllInGroupLazyComponent', () => {
  let component: MasterByFragmentAllInGroupLazyComponent;
  let fixture: ComponentFixture<MasterByFragmentAllInGroupLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterByFragmentAllInGroupLazyComponent]
    });
    fixture = TestBed.createComponent(MasterByFragmentAllInGroupLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
