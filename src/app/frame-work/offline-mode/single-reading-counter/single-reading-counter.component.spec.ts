import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReadingCounterComponent } from './single-reading-counter.component';

describe('SingleReadingCounterComponent', () => {
  let component: SingleReadingCounterComponent;
  let fixture: ComponentFixture<SingleReadingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReadingCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReadingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
