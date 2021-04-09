import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentDetailsComponent } from './fragment-details.component';

describe('FragmentDetailsComponent', () => {
  let component: FragmentDetailsComponent;
  let fixture: ComponentFixture<FragmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
