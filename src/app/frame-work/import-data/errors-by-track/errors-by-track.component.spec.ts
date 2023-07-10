import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsByTrackComponent } from './errors-by-track.component';

describe('ErrorsByTrackComponent', () => {
  let component: ErrorsByTrackComponent;
  let fixture: ComponentFixture<ErrorsByTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsByTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsByTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
