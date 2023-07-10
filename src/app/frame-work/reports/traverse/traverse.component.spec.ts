import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraverseComponent } from './traverse.component';

describe('TraverseComponent', () => {
  let component: TraverseComponent;
  let fixture: ComponentFixture<TraverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
