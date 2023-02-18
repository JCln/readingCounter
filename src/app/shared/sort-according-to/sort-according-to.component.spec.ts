import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAccordingToComponent } from './sort-according-to.component';

describe('SortAccordingToComponent', () => {
  let component: SortAccordingToComponent;
  let fixture: ComponentFixture<SortAccordingToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortAccordingToComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAccordingToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
