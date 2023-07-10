import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInStatesComponent } from './count-in-states.component';

describe('CountInStatesComponent', () => {
  let component: CountInStatesComponent;
  let fixture: ComponentFixture<CountInStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountInStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountInStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
