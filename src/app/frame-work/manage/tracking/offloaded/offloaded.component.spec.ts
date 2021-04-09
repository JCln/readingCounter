import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffloadedComponent } from './offloaded.component';

describe('OffloadedComponent', () => {
  let component: OffloadedComponent;
  let fixture: ComponentFixture<OffloadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffloadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffloadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
