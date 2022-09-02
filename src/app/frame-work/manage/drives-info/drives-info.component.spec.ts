import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivesInfoComponent } from './drives-info.component';

describe('DrivesInfoComponent', () => {
  let component: DrivesInfoComponent;
  let fixture: ComponentFixture<DrivesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivesInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
