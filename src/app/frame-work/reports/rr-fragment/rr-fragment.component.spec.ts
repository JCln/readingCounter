import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrFragmentComponent } from './rr-fragment.component';

describe('RrFragmentComponent', () => {
  let component: RrFragmentComponent;
  let fixture: ComponentFixture<RrFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrFragmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
