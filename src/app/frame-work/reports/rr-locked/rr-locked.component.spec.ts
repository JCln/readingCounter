import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrLockedComponent } from './rr-locked.component';

describe('RrLockedComponent', () => {
  let component: RrLockedComponent;
  let fixture: ComponentFixture<RrLockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrLockedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
