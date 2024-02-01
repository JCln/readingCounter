import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMasterByFragmentComponent } from './simple-master-by-fragment.component';

describe('SimpleMasterByFragmentComponent', () => {
  let component: SimpleMasterByFragmentComponent;
  let fixture: ComponentFixture<SimpleMasterByFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleMasterByFragmentComponent]
    });
    fixture = TestBed.createComponent(SimpleMasterByFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
