import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveInfoPieComponent } from './drive-info-pie.component';


describe('DriveInfoPieComponent', () => {
  let component: DriveInfoPieComponent;
  let fixture: ComponentFixture<DriveInfoPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriveInfoPieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveInfoPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
