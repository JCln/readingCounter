import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastStatesComponent } from './last-states.component';

describe('LastStatesComponent', () => {
  let component: LastStatesComponent;
  let fixture: ComponentFixture<LastStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
