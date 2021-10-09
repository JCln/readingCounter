import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashNotReaderComponent } from './dash-not-reader.component';

describe('DashNotReaderComponent', () => {
  let component: DashNotReaderComponent;
  let fixture: ComponentFixture<DashNotReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashNotReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashNotReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
