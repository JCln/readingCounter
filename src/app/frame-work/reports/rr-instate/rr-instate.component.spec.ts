import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrInstateComponent } from './rr-instate.component';

describe('RrInstateComponent', () => {
  let component: RrInstateComponent;
  let fixture: ComponentFixture<RrInstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrInstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrInstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
