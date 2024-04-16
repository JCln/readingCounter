import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiwaComponent } from './hiwa.component';

describe('HiwaComponent', () => {
  let component: HiwaComponent;
  let fixture: ComponentFixture<HiwaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiwaComponent]
    });
    fixture = TestBed.createComponent(HiwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
