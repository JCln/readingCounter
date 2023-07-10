import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrTimeComponent } from './rr-time.component';

describe('RrTimeComponent', () => {
  let component: RrTimeComponent;
  let fixture: ComponentFixture<RrTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
