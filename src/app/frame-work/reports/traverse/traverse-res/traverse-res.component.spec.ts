import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraverseResComponent } from './traverse-res.component';

describe('TraverseResComponent', () => {
  let component: TraverseResComponent;
  let fixture: ComponentFixture<TraverseResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraverseResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraverseResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
